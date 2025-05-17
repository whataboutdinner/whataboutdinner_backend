import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Tabs, 
  Tab, 
  Paper,
  Divider,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import UserRecipeLibrary from '../../components/recipes/UserRecipeLibrary';
import RecipeCreationWizard from '../../components/recipes/RecipeCreationWizard';
import RecipePrivacySettings from '../../components/recipes/RecipePrivacySettings';
import OfflineRecipeSupport from '../../components/recipes/OfflineRecipeSupport';
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
      id={`recipes-tabpanel-${index}`}
      aria-labelledby={`recipes-tab-${index}`}
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

const RecipesPage = () => {
  const { data: session, status } = useSession();
  const [tabValue, setTabValue] = useState(0);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleCreateRecipe = () => {
    setCreateDialogOpen(true);
  };
  
  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
  };
  
  const handleRecipeCreated = (recipe) => {
    setCreateDialogOpen(false);
    // Refresh recipe list or navigate to the new recipe
  };
  
  const handlePrivacySettings = (recipe) => {
    setSelectedRecipe(recipe);
    setPrivacyDialogOpen(true);
  };
  
  const handleClosePrivacyDialog = () => {
    setPrivacyDialogOpen(false);
    setSelectedRecipe(null);
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
        <Typography>Please sign in to access your recipes.</Typography>
      </PageContainer>
    );
  }
  
  return (
    <>
      <Head>
        <title>My Recipes | WhatAboutDinner</title>
      </Head>
      
      <PageContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h3" component="h1" style={{ color: '#FF5722' }}>
            My Recipes
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateRecipe}
          >
            Create Recipe
          </Button>
        </Box>
        
        <Typography variant="subtitle1" paragraph color="textSecondary">
          Manage your personal recipes, control privacy settings, and enable offline access.
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
              <Tab label="Recipe Library" style={{ color: 'white', fontWeight: 'bold' }} />
              <Tab label="Offline Access" style={{ color: 'white', fontWeight: 'bold' }} />
              <Tab label="Privacy Settings" style={{ color: 'white', fontWeight: 'bold' }} />
            </Tabs>
          </Box>
          
          <TabPanel value={tabValue} index={0}>
            <UserRecipeLibrary onPrivacySettings={handlePrivacySettings} />
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <OfflineRecipeSupport />
          </TabPanel>
          
          <TabPanel value={tabValue} index={2}>
            <Typography variant="subtitle1" paragraph>
              Select a recipe from your library and click "Privacy Settings" to manage who can see your recipes.
            </Typography>
          </TabPanel>
        </Paper>
      </PageContainer>
      
      {/* Recipe Creation Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={handleCloseCreateDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Create New Recipe
          <IconButton
            aria-label="close"
            onClick={handleCloseCreateDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <RecipeCreationWizard onComplete={handleRecipeCreated} />
        </DialogContent>
      </Dialog>
      
      {/* Privacy Settings Dialog */}
      <Dialog
        open={privacyDialogOpen}
        onClose={handleClosePrivacyDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Recipe Privacy Settings
          <IconButton
            aria-label="close"
            onClick={handleClosePrivacyDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedRecipe && (
            <RecipePrivacySettings 
              recipeId={selectedRecipe._id} 
              initialVisibility={selectedRecipe.visibility} 
              initialSharedWith={selectedRecipe.sharedWith}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecipesPage;
