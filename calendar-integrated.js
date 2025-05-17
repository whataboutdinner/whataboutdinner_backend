import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Tabs, 
  Tab, 
  Paper,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import WeeklyCalendar from '../../components/calendar/WeeklyCalendar';
import MobileCalendarView from '../../components/calendar/MobileCalendarView';
import DragDropCalendar from '../../components/calendar/DragDropCalendar';
import UserPreferences from '../../components/calendar/UserPreferences';
import UserRecipeLibrary from '../../components/recipes/UserRecipeLibrary';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import axios from 'axios';

const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
}));

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`calendar-tabpanel-${index}`}
      aria-labelledby={`calendar-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

const CalendarIntegratedPage = () => {
  const { data: session, status } = useSession();
  const [tabValue, setTabValue] = useState(0);
  const [calendar, setCalendar] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  useEffect(() => {
    if (session) {
      fetchUserRecipes();
    }
  }, [session]);
  
  const fetchUserRecipes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/user/recipes');
      setUserRecipes(response.data.recipes || []);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load user recipes:', err);
      setLoading(false);
    }
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleCalendarUpdate = (updatedCalendar) => {
    setCalendar(updatedCalendar);
  };
  
  const handleRecipeSelect = (recipe) => {
    // Switch to drag & drop tab when a recipe is selected
    setTabValue(2);
  };
  
  if (status === 'loading') {
    return (
      <PageContainer>
        <Typography>Loading...</Typography>
      </PageContainer>
    );
  }
  
  if (status === 'unauthenticated') {
    return (
      <PageContainer>
        <Typography>Please sign in to access your food calendar.</Typography>
      </PageContainer>
    );
  }
  
  return (
    <>
      <Head>
        <title>My Food Calendar | WhatAboutDinner</title>
      </Head>
      
      <PageContainer>
        <Typography variant="h3" component="h1" gutterBottom style={{ color: '#FF5722' }}>
          My Food Calendar
        </Typography>
        
        <Typography variant="subtitle1" paragraph color="textSecondary">
          Plan your meals for the week and discover new recipes based on your preferences.
          Drag and drop your own recipes directly into your calendar.
        </Typography>
        
        <Divider sx={{ mb: 4 }} />
        
        <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#FF9800' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
            >
              <Tab label="Weekly Calendar" style={{ color: 'white', fontWeight: 'bold' }} />
              <Tab label="My Recipes" style={{ color: 'white', fontWeight: 'bold' }} />
              <Tab label="Drag & Drop" style={{ color: 'white', fontWeight: 'bold' }} />
              <Tab label="Preferences" style={{ color: 'white', fontWeight: 'bold' }} />
            </Tabs>
          </Box>
          
          <TabPanel value={tabValue} index={0}>
            {isMobile ? (
              <MobileCalendarView />
            ) : (
              <WeeklyCalendar onCalendarUpdate={handleCalendarUpdate} />
            )}
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <UserRecipeLibrary onRecipeSelect={handleRecipeSelect} />
          </TabPanel>
          
          <TabPanel value={tabValue} index={2}>
            <DragDropCalendar userRecipes={userRecipes} />
          </TabPanel>
          
          <TabPanel value={tabValue} index={3}>
            <UserPreferences calendar={calendar} onUpdate={handleCalendarUpdate} />
          </TabPanel>
        </Paper>
      </PageContainer>
    </>
  );
};

export default CalendarIntegratedPage;
