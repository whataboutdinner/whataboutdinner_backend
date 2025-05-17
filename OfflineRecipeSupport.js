import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Switch, 
  FormControlLabel, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton, 
  Divider,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import DeleteIcon from '@mui/icons-material/Delete';
import StorageIcon from '@mui/icons-material/Storage';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const OfflineContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  backgroundColor: '#FFF8E1',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
}));

const StorageInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '4px',
  marginBottom: theme.spacing(3),
}));

const RecipeList = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '4px',
  maxHeight: '400px',
  overflowY: 'auto',
}));

const OfflineRecipeSupport = () => {
  const { data: session } = useSession();
  const [offlineEnabled, setOfflineEnabled] = useState(false);
  const [offlineRecipes, setOfflineRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [storageUsage, setStorageUsage] = useState({ used: 0, total: 0 });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Check if offline storage is supported
  const isOfflineSupported = typeof window !== 'undefined' && 
    'indexedDB' in window && 
    'localStorage' in window && 
    'serviceWorker' in navigator;
  
  // Initialize offline support
  useEffect(() => {
    if (session && isOfflineSupported) {
      checkOfflineStatus();
      loadOfflineRecipes();
      calculateStorageUsage();
    }
  }, [session]);
  
  const checkOfflineStatus = () => {
    const status = localStorage.getItem('offlineRecipesEnabled');
    setOfflineEnabled(status === 'true');
  };
  
  const loadOfflineRecipes = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, this would use IndexedDB
      // For this demo, we'll use localStorage
      const offlineData = localStorage.getItem('offlineRecipes');
      if (offlineData) {
        setOfflineRecipes(JSON.parse(offlineData));
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Failed to load offline recipes:', err);
      setLoading(false);
    }
  };
  
  const calculateStorageUsage = () => {
    // In a real implementation, this would use the StorageManager API
    // For this demo, we'll estimate based on localStorage
    try {
      let totalSize = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        totalSize += (key.length + value.length) * 2; // Approximate size in bytes
      }
      
      setStorageUsage({
        used: totalSize / (1024 * 1024), // Convert to MB
        total: 5 // Assume 5MB limit for localStorage
      });
    } catch (err) {
      console.error('Failed to calculate storage usage:', err);
    }
  };
  
  const handleToggleOffline = async (event) => {
    const enabled = event.target.checked;
    setOfflineEnabled(enabled);
    
    try {
      localStorage.setItem('offlineRecipesEnabled', enabled.toString());
      
      if (enabled) {
        // Register service worker for offline support
        if ('serviceWorker' in navigator) {
          await navigator.serviceWorker.register('/service-worker.js');
        }
        
        // Sync recipes for offline use
        await syncRecipesForOffline();
      } else {
        // Clear offline recipes
        localStorage.removeItem('offlineRecipes');
        setOfflineRecipes([]);
      }
      
      setSnackbar({
        open: true,
        message: enabled ? 'Offline recipe access enabled' : 'Offline recipe access disabled',
        severity: 'success'
      });
    } catch (err) {
      console.error('Failed to toggle offline mode:', err);
      
      setSnackbar({
        open: true,
        message: 'Failed to change offline settings',
        severity: 'error'
      });
      
      // Revert UI state
      setOfflineEnabled(!enabled);
    }
  };
  
  const syncRecipesForOffline = async () => {
    try {
      setSyncing(true);
      
      // Fetch user's recipes
      const response = await axios.get('/api/user/recipes');
      const recipes = response.data.recipes || [];
      
      // Store recipes in localStorage (in a real app, use IndexedDB)
      localStorage.setItem('offlineRecipes', JSON.stringify(recipes));
      setOfflineRecipes(recipes);
      
      // Update storage usage
      calculateStorageUsage();
      
      setSyncing(false);
      
      return true;
    } catch (err) {
      console.error('Failed to sync recipes for offline use:', err);
      setSyncing(false);
      
      setSnackbar({
        open: true,
        message: 'Failed to sync recipes for offline use',
        severity: 'error'
      });
      
      return false;
    }
  };
  
  const handleSyncNow = async () => {
    const success = await syncRecipesForOffline();
    
    if (success) {
      setSnackbar({
        open: true,
        message: `Successfully synced ${offlineRecipes.length} recipes for offline use`,
        severity: 'success'
      });
    }
  };
  
  const handleRemoveOfflineRecipe = (recipeId) => {
    try {
      // Remove recipe from offline storage
      const updatedRecipes = offlineRecipes.filter(recipe => recipe._id !== recipeId);
      localStorage.setItem('offlineRecipes', JSON.stringify(updatedRecipes));
      setOfflineRecipes(updatedRecipes);
      
      // Update storage usage
      calculateStorageUsage();
      
      setSnackbar({
        open: true,
        message: 'Recipe removed from offline storage',
        severity: 'success'
      });
    } catch (err) {
      console.error('Failed to remove offline recipe:', err);
      
      setSnackbar({
        open: true,
        message: 'Failed to remove recipe from offline storage',
        severity: 'error'
      });
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };
  
  if (!isOfflineSupported) {
    return (
      <OfflineContainer>
        <Typography variant="h5" gutterBottom style={{ color: '#FF5722' }}>
          Offline Recipe Access
        </Typography>
        
        <Alert severity="warning">
          Your browser does not support offline storage features. Please use a modern browser like Chrome, Firefox, or Edge.
        </Alert>
      </OfflineContainer>
    );
  }
  
  return (
    <OfflineContainer>
      <Typography variant="h5" gutterBottom style={{ color: '#FF5722' }}>
        Offline Recipe Access
      </Typography>
      
      <Typography variant="body1" paragraph>
        Enable offline access to your recipes so you can view them even without an internet connection.
      </Typography>
      
      <FormControlLabel
        control={
          <Switch
            checked={offlineEnabled}
            onChange={handleToggleOffline}
            color="primary"
          />
        }
        label="Enable offline recipe access"
      />
      
      {offlineEnabled && (
        <>
          <StorageInfo>
            <Box display="flex" alignItems="center">
              <StorageIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                Storage used: {storageUsage.used.toFixed(2)} MB of {storageUsage.total} MB
              </Typography>
            </Box>
            
            <Button
              variant="outlined"
              startIcon={syncing ? <CircularProgress size={20} /> : <CloudDownloadIcon />}
              onClick={handleSyncNow}
              disabled={syncing}
            >
              {syncing ? 'Syncing...' : 'Sync Now'}
            </Button>
          </StorageInfo>
          
          <Typography variant="subtitle1" gutterBottom>
            Available Offline Recipes ({offlineRecipes.length})
          </Typography>
          
          {loading ? (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress />
            </Box>
          ) : offlineRecipes.length === 0 ? (
            <Box textAlign="center" py={3} bgcolor="background.paper" borderRadius={1}>
              <CloudOffIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
              <Typography color="textSecondary">
                No recipes available offline yet
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CloudDownloadIcon />}
                onClick={handleSyncNow}
                sx={{ mt: 2 }}
                disabled={syncing}
              >
                Sync Recipes Now
              </Button>
            </Box>
          ) : (
            <RecipeList>
              {offlineRecipes.map((recipe) => (
                <React.Fragment key={recipe._id}>
                  <ListItem>
                    <ListItemText
                      primary={recipe.title}
                      secondary={`${recipe.cuisine} • ${recipe.mealType} • ${recipe.prepTime + recipe.cookTime} min`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="remove"
                        onClick={() => handleRemoveOfflineRecipe(recipe._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </RecipeList>
          )}
          
          <Box mt={2}>
            <Typography variant="caption" color="textSecondary">
              Note: Images may not be available offline to conserve storage space.
            </Typography>
          </Box>
        </>
      )}
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </OfflineContainer>
  );
};

export default OfflineRecipeSupport;
