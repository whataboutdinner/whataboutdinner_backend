import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, CircularProgress, Paper, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import DayMealCard from './DayMealCard';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const CalendarContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  backgroundColor: '#FFF8E1',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
}));

const WeekNavigation = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2)
}));

const NavButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FF9800',
  color: 'white',
  '&:hover': {
    backgroundColor: '#F57C00',
  },
}));

const DayHeader = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: '#FF9800',
  color: 'white',
  borderRadius: '4px 4px 0 0',
  textAlign: 'center',
  fontWeight: 'bold'
}));

const WeeklyCalendar = () => {
  const { data: session } = useSession();
  const [calendar, setCalendar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [subcategories, setSubcategories] = useState({ lunch: [], dinner: [] });
  const [error, setError] = useState(null);
  
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
  
  return (
    <CalendarContainer>
      <Typography variant="h4" gutterBottom style={{ color: '#FF5722', textAlign: 'center' }}>
        My Food Calendar
      </Typography>
      
      <WeekNavigation>
        <NavButton onClick={handlePreviousWeek}>Previous Week</NavButton>
        <Typography variant="h6">
          Week {currentWeekIndex === 0 ? 'Current' : currentWeekIndex > 0 ? `+${currentWeekIndex}` : `${currentWeekIndex}`}
        </Typography>
        <NavButton onClick={handleNextWeek}>Next Week</NavButton>
      </WeekNavigation>
      
      <Grid container spacing={2}>
        {days.map((day, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box mb={3}>
              <DayHeader variant="subtitle1">
                {day}
              </DayHeader>
              
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
          </Grid>
        ))}
      </Grid>
    </CalendarContainer>
  );
};

export default WeeklyCalendar;
