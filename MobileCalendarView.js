import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton, 
  Divider,
  CircularProgress,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DayMealCard from './DayMealCard';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const MobileContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
  backgroundColor: '#FFF8E1',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
}));

const DayNavigation = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2)
}));

const DayHeader = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: '#FF9800',
  color: 'white',
  borderRadius: '4px 4px 0 0',
  textAlign: 'center',
  fontWeight: 'bold'
}));

const MobileCalendarView = () => {
  const { data: session } = useSession();
  const [calendar, setCalendar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [currentDayIndex, setCurrentDayIndex] = useState(new Date().getDay()); // Default to today
  const [subcategories, setSubcategories] = useState({ lunch: [], dinner: [] });
  const [error, setError] = useState(null);
  const swipeableRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Fetch user's calendar data
  useEffect(() => {
    if (session) {
      fetchCalendar();
      fetchSubcategories();
    }
  }, [session]);
  
  const fetchCalendar = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/user/calendar');
      if (response.data.calendar) {
        setCalendar(response.data.calendar);
      } else {
        // Create a new calendar if none exists
        const newCalendar = {
          weeks: [{ weekIndex: 0, days: [] }],
          dietaryPreferences: []
        };
        setCalendar(newCalendar);
      }
    } catch (err) {
      setError('Failed to load calendar data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchSubcategories = async () => {
    try {
      const lunchResponse = await axios.get('/api/user/calendar/subcategories?mealType=lunch');
      const dinnerResponse = await axios.get('/api/user/calendar/subcategories?mealType=dinner');
      
      setSubcategories({
        lunch: lunchResponse.data.subcategories || [],
        dinner: dinnerResponse.data.subcategories || []
      });
    } catch (err) {
      console.error('Failed to load subcategories:', err);
    }
  };
  
  const getCurrentWeek = () => {
    if (!calendar || !calendar.weeks) return null;
    return calendar.weeks.find(w => w.weekIndex === currentWeekIndex) || { weekIndex: currentWeekIndex, days: [] };
  };
  
  const handlePreviousDay = () => {
    const newIndex = currentDayIndex > 0 ? currentDayIndex - 1 : 6;
    setCurrentDayIndex(newIndex);
    if (swipeableRef.current) {
      swipeableRef.current.slideLeft();
    }
  };
  
  const handleNextDay = () => {
    const newIndex = currentDayIndex < 6 ? currentDayIndex + 1 : 0;
    setCurrentDayIndex(newIndex);
    if (swipeableRef.current) {
      swipeableRef.current.slideRight();
    }
  };
  
  const handleChangeIndex = (index) => {
    // Handle wrapping around
    if (index < 0) {
      setCurrentDayIndex(6);
    } else if (index > 6) {
      setCurrentDayIndex(0);
    } else {
      setCurrentDayIndex(index);
    }
  };
  
  const handlePreviousWeek = () => {
    setCurrentWeekIndex(prev => prev - 1);
    ensureWeekExists(currentWeekIndex - 1);
  };
  
  const handleNextWeek = () => {
    setCurrentWeekIndex(prev => prev + 1);
    ensureWeekExists(currentWeekIndex + 1);
  };
  
  const ensureWeekExists = (weekIndex) => {
    if (!calendar) return;
    
    const weekExists = calendar.weeks.some(w => w.weekIndex === weekIndex);
    if (!weekExists) {
      const updatedCalendar = { ...calendar };
      updatedCalendar.weeks.push({ weekIndex, days: [] });
      setCalendar(updatedCalendar);
      saveCalendar(updatedCalendar);
    }
  };
  
  const saveCalendar = async (calendarData) => {
    try {
      await axios.post('/api/user/calendar', calendarData);
    } catch (err) {
      console.error('Failed to save calendar:', err);
    }
  };
  
  const handleSubcategoryChange = (dayOfWeek, mealType, subcategory) => {
    if (!calendar) return;
    
    const updatedCalendar = { ...calendar };
    const week = updatedCalendar.weeks.find(w => w.weekIndex === currentWeekIndex);
    
    if (!week) return;
    
    const dayEntry = week.days.find(d => d.dayOfWeek === dayOfWeek && d.mealType === mealType);
    
    if (dayEntry) {
      dayEntry.subcategory = subcategory;
    } else {
      week.days.push({
        dayOfWeek,
        mealType,
        subcategory,
        recipe: null,
        feedback: { liked: null, makeAgain: false, notes: '' }
      });
    }
    
    setCalendar(updatedCalendar);
    saveCalendar(updatedCalendar);
  };
  
  const handleGenerateRecipe = async (dayOfWeek, mealType) => {
    try {
      const week = getCurrentWeek();
      if (!week) return;
      
      const dayEntry = week.days.find(d => d.dayOfWeek === dayOfWeek && d.mealType === mealType);
      if (!dayEntry || !dayEntry.subcategory) {
        alert('Please select a subcategory first');
        return;
      }
      
      const response = await axios.post('/api/user/calendar/generate', {
        weekIndex: currentWeekIndex,
        dayOfWeek,
        mealType
      });
      
      if (response.data.recipe) {
        const updatedCalendar = { ...calendar };
        const week = updatedCalendar.weeks.find(w => w.weekIndex === currentWeekIndex);
        const dayEntry = week.days.find(d => d.dayOfWeek === dayOfWeek && d.mealType === mealType);
        
        if (dayEntry) {
          dayEntry.recipe = response.data.recipe;
          setCalendar(updatedCalendar);
        }
      }
    } catch (err) {
      console.error('Failed to generate recipe:', err);
      alert('Failed to generate recipe. Please try again.');
    }
  };
  
  const handleFeedback = async (dayOfWeek, mealType, liked, makeAgain, notes) => {
    try {
      await axios.post('/api/user/calendar/feedback', {
        weekIndex: currentWeekIndex,
        dayOfWeek,
        mealType,
        liked,
        makeAgain,
        notes
      });
      
      // Update local state
      const updatedCalendar = { ...calendar };
      const week = updatedCalendar.weeks.find(w => w.weekIndex === currentWeekIndex);
      const dayEntry = week.days.find(d => d.dayOfWeek === dayOfWeek && d.mealType === mealType);
      
      if (dayEntry) {
        dayEntry.feedback = { liked, makeAgain, notes };
        setCalendar(updatedCalendar);
      }
    } catch (err) {
      console.error('Failed to save feedback:', err);
      alert('Failed to save feedback. Please try again.');
    }
  };
  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <CircularProgress style={{ color: '#FF9800' }} />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  
  const currentWeek = getCurrentWeek();
  
  // Only show mobile view on small screens
  if (!isMobile) {
    return null;
  }
  
  return (
    <MobileContainer>
      <Typography variant="h5" gutterBottom style={{ color: '#FF5722', textAlign: 'center' }}>
        My Food Calendar
      </Typography>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <IconButton onClick={handlePreviousWeek}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="subtitle1">
          Week {currentWeekIndex === 0 ? 'Current' : currentWeekIndex > 0 ? `+${currentWeekIndex}` : `${currentWeekIndex}`}
        </Typography>
        <IconButton onClick={handleNextWeek}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <DayNavigation>
        <IconButton onClick={handlePreviousDay}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h6">
          {days[currentDayIndex]}
        </Typography>
        <IconButton onClick={handleNextDay}>
          <ArrowForwardIosIcon />
        </IconButton>
      </DayNavigation>
      
      <SwipeableViews
        index={currentDayIndex}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
        resistance
        ref={swipeableRef}
      >
        {days.map((day, index) => (
          <Box key={index} px={1}>
            <Box mb={3}>
              <DayMealCard
                dayOfWeek={index}
                mealType="lunch"
                subcategories={subcategories.lunch}
                dayEntry={currentWeek?.days.find(d => d.dayOfWeek === index && d.mealType === 'lunch')}
                onSubcategoryChange={(subcategory) => handleSubcategoryChange(index, 'lunch', subcategory)}
                onGenerateRecipe={() => handleGenerateRecipe(index, 'lunch')}
                onFeedback={(liked, makeAgain, notes) => handleFeedback(index, 'lunch', liked, makeAgain, notes)}
              />
              
              <Box mt={2}>
                <DayMealCard
                  dayOfWeek={index}
                  mealType="dinner"
                  subcategories={subcategories.dinner}
                  dayEntry={currentWeek?.days.find(d => d.dayOfWeek === index && d.mealType === 'dinner')}
                  onSubcategoryChange={(subcategory) => handleSubcategoryChange(index, 'dinner', subcategory)}
                  onGenerateRecipe={() => handleGenerateRecipe(index, 'dinner')}
                  onFeedback={(liked, makeAgain, notes) => handleFeedback(index, 'dinner', liked, makeAgain, notes)}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </SwipeableViews>
      
      <Box display="flex" justifyContent="center" mt={2}>
        {days.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              mx: 0.5,
              bgcolor: index === currentDayIndex ? '#FF9800' : 'rgba(0, 0, 0, 0.2)',
            }}
          />
        ))}
      </Box>
    </MobileContainer>
  );
};

export default MobileCalendarView;
