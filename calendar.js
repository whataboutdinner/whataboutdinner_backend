import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Tabs, 
  Tab, 
  Paper,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import WeeklyCalendar from '../../components/calendar/WeeklyCalendar';
import UserPreferences from '../../components/calendar/UserPreferences';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

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

const CalendarPage = () => {
  const { data: session, status } = useSession();
  const [tabValue, setTabValue] = useState(0);
  const [calendar, setCalendar] = useState(null);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleCalendarUpdate = (updatedCalendar) => {
    setCalendar(updatedCalendar);
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
              <Tab label="Preferences" style={{ color: 'white', fontWeight: 'bold' }} />
            </Tabs>
          </Box>
          
          <TabPanel value={tabValue} index={0}>
            <WeeklyCalendar onCalendarUpdate={handleCalendarUpdate} />
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <UserPreferences calendar={calendar} onUpdate={handleCalendarUpdate} />
          </TabPanel>
        </Paper>
      </PageContainer>
    </>
  );
};

export default CalendarPage;
