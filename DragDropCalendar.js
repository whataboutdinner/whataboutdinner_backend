import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  CircularProgress,
  Divider,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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

const DayHeader = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: '#FF9800',
  color: 'white',
  borderRadius: '4px 4px 0 0',
  textAlign: 'center',
  fontWeight: 'bold'
}));

const RecipeItem = styled(Paper)(({ theme, isusercreated }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: isusercreated ? '#E8F5E9' : 'white', // Highlight user-created recipes with light green background
  border: isusercreated ? `2px solid ${theme.palette.secondary.main}` : 'none',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  cursor: 'grab',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
  }
}));

const DropZone = styled(Box)(({ theme, isDraggingOver }) => ({
  minHeight: '150px',
  padding: theme.spacing(2),
  backgroundColor: isDraggingOver ? 'rgba(255, 152, 0, 0.1)' : 'transparent',
  border: isDraggingOver ? '2px dashed #FF9800' : '2px dashed #E0E0E0',
  borderRadius: '4px',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}));

const DragDropCalendar = ({ userRecipes = [] }) => {
  const { data: session } = useSession();
  const [calendar, setCalendar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [subcategories, setSubcategories] = useState({ lunch: [], dinner: [] });
  const [dragMessage, setDragMessage] = useState(null);
  
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
  
  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    
    // Dropped outside a drop zone
    if (!destination) {
      return;
    }
    
    // Parse destination ID to get day and meal type
    const [dayIndex, mealType] = destination.droppableId.split('-');
    
    // Get the recipe that was dragged
    const recipeIndex = source.index;
    const recipe = userRecipes[recipeIndex];
    
    try {
      // Add recipe to calendar
      const response = await axios.post('/api/user/calendar/add-user-recipe', {
        weekIndex: currentWeekIndex,
        dayOfWeek: parseInt(dayIndex),
        mealType,
        recipeId: recipe._id
      });
      
      if (response.data.success) {
        // Update local calendar state
        const updatedCalendar = { ...calendar };
        const week = updatedCalendar.weeks.find(w => w.weekIndex === currentWeekIndex);
        
        if (week) {
          // Find or create day entry
          let dayEntry = week.days.find(d => d.dayOfWeek === parseInt(dayIndex) && d.mealType === mealType);
          
          if (dayEntry) {
            dayEntry.recipe = recipe;
            dayEntry.subcategory = recipe.subcategory;
          } else {
            week.days.push({
              dayOfWeek: parseInt(dayIndex),
              mealType,
              subcategory: recipe.subcategory,
              recipe,
              feedback: { liked: null, makeAgain: false, notes: '' }
            });
          }
          
          setCalendar(updatedCalendar);
          setDragMessage({
            type: 'success',
            text: `Added "${recipe.title}" to ${days[dayIndex]} ${mealType}`
          });
          
          // Clear message after 3 seconds
          setTimeout(() => {
            setDragMessage(null);
          }, 3000);
        }
      }
    } catch (err) {
      console.error('Failed to add recipe to calendar:', err);
      setDragMessage({
        type: 'error',
        text: 'Failed to add recipe to calendar. Please try again.'
      });
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setDragMessage(null);
      }, 3000);
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
  
  const saveCalendar = async (calendarData) => {
    try {
      await axios.post('/api/user/calendar', calendarData);
    } catch (err) {
      console.error('Failed to save calendar:', err);
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
      <Typography variant="h5" gutterBottom style={{ color: '#FF5722', textAlign: 'center' }}>
        Drag & Drop Calendar
      </Typography>
      
      <Typography variant="subtitle1" paragraph color="textSecondary" textAlign="center">
        Drag your recipes from the list below and drop them into your calendar
      </Typography>
      
      {dragMessage && (
        <Alert severity={dragMessage.type} sx={{ mb: 2 }}>
          {dragMessage.text}
        </Alert>
      )}
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2}>
          {days.map((day, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box mb={3}>
                <DayHeader variant="subtitle1">
                  {day}
                </DayHeader>
                
                <Box mb={2}>
                  <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>Lunch</Typography>
                  <Droppable droppableId={`${index}-lunch`}>
                    {(provided, snapshot) => (
                      <DropZone
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                      >
                        {currentWeek?.days.find(d => d.dayOfWeek === index && d.mealType === 'lunch')?.recipe ? (
                          <DayMealCard
                            dayOfWeek={index}
                            mealType="lunch"
                            subcategories={subcategories.lunch}
                            dayEntry={currentWeek?.days.find(d => d.dayOfWeek === index && d.mealType === 'lunch')}
                            onSubcategoryChange={(subcategory) => handleSubcategoryChange(index, 'lunch', subcategory)}
                            onFeedback={(liked, makeAgain, notes) => handleFeedback(index, 'lunch', liked, makeAgain, notes)}
                          />
                        ) : (
                          <Typography color="textSecondary" textAlign="center">
                            Drop a recipe here
                          </Typography>
                        )}
                        {provided.placeholder}
                      </DropZone>
                    )}
                  </Droppable>
                </Box>
                
                <Box mb={2}>
                  <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>Dinner</Typography>
                  <Droppable droppableId={`${index}-dinner`}>
                    {(provided, snapshot) => (
                      <DropZone
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                      >
                        {currentWeek?.days.find(d => d.dayOfWeek === index && d.mealType === 'dinner')?.recipe ? (
                          <DayMealCard
                            dayOfWeek={index}
                            mealType="dinner"
                            subcategories={subcategories.dinner}
                            dayEntry={currentWeek?.days.find(d => d.dayOfWeek === index && d.mealType === 'dinner')}
                            onSubcategoryChange={(subcategory) => handleSubcategoryChange(index, 'dinner', subcategory)}
                            onFeedback={(liked, makeAgain, notes) => handleFeedback(index, 'dinner', liked, makeAgain, notes)}
                          />
                        ) : (
                          <Typography color="textSecondary" textAlign="center">
                            Drop a recipe here
                          </Typography>
                        )}
                        {provided.placeholder}
                      </DropZone>
                    )}
                  </Droppable>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          Your Recipes
        </Typography>
        
        <Droppable droppableId="recipesList" isDropDisabled={true}>
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ mt: 2 }}
            >
              <Grid container spacing={2}>
                {userRecipes.map((recipe, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={recipe._id}>
                    <Draggable draggableId={recipe._id} index={index}>
                      {(provided) => (
                        <RecipeItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          isusercreated={recipe.isUserCreated ? 'true' : 'false'}
                        >
                          <Typography variant="subtitle1" noWrap>
                            {recipe.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" noWrap>
                            {recipe.cuisine} • {recipe.mealType}
                          </Typography>
                          <Box display="flex" alignItems="center" mt={1}>
                            <Typography variant="caption" color="textSecondary">
                              {recipe.prepTime + recipe.cookTime} min • {recipe.difficulty}
                            </Typography>
                          </Box>
                        </RecipeItem>
                      )}
                    </Draggable>
                  </Grid>
                ))}
                {userRecipes.length === 0 && (
                  <Grid item xs={12}>
                    <Typography color="textSecondary" textAlign="center">
                      No recipes available. Create some recipes first.
                    </Typography>
                  </Grid>
                )}
              </Grid>
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </CalendarContainer>
  );
};

export default DragDropCalendar;
