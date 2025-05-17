import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  Button, 
  IconButton, 
  Chip, 
  TextField, 
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  CircularProgress,
  Divider,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import EventIcon from '@mui/icons-material/Event';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const LibraryContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const FilterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: '#FFF8E1',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}));

const RecipeCard = styled(Card)(({ theme, isusercreated }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
  },
  position: 'relative',
  border: isusercreated === 'true' ? `2px solid ${theme.palette.secondary.main}` : 'none',
}));

const RecipeCardMedia = styled(CardMedia)(({ theme }) => ({
  paddingTop: '56.25%', // 16:9 aspect ratio
  position: 'relative'
}));

const RecipeCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
}));

const PrivacyBadge = styled(Box)(({ theme, visibility }) => {
  let color;
  switch (visibility) {
    case 'private':
      color = '#F44336'; // Red
      break;
    case 'friends':
      color = '#FF9800'; // Orange
      break;
    case 'public':
      color = '#4CAF50'; // Green
      break;
    default:
      color = '#9E9E9E'; // Grey
  }
  
  return {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '50%',
    padding: '4px',
    zIndex: 1,
    color: color
  };
});

const UserRecipeLibrary = ({ onRecipeSelect }) => {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState([]);
  const [sharedRecipes, setSharedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    mealType: '',
    cuisine: '',
    dietaryCategory: '',
    difficulty: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  
  // Options for filters
  const [filterOptions, setFilterOptions] = useState({
    mealTypes: [],
    cuisines: [],
    dietaryCategories: [],
    difficulties: ['Easy', 'Medium', 'Hard']
  });
  
  // Fetch recipes on component mount
  useEffect(() => {
    if (session) {
      fetchRecipes();
      fetchFilterOptions();
    }
  }, [session]);
  
  const fetchRecipes = async () => {
    try {
      setLoading(true);
      
      // Fetch user's own recipes
      const myRecipesResponse = await axios.get('/api/user/recipes');
      setRecipes(myRecipesResponse.data.recipes || []);
      
      // Fetch recipes shared with the user
      const sharedRecipesResponse = await axios.get('/api/user/recipes/shared');
      setSharedRecipes(sharedRecipesResponse.data.recipes || []);
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load recipes');
      setLoading(false);
      console.error(err);
    }
  };
  
  const fetchFilterOptions = async () => {
    try {
      // In a real implementation, you would fetch these from the API
      // For now, we'll use static data and extract unique values from recipes
      
      const response = await axios.get('/api/recipes/filter-options');
      setFilterOptions(response.data);
    } catch (err) {
      console.error('Failed to load filter options:', err);
      
      // Fallback to extracting from recipes when they load
      if (recipes.length > 0) {
        const mealTypes = [...new Set(recipes.map(recipe => recipe.mealType))];
        const cuisines = [...new Set(recipes.map(recipe => recipe.cuisine))];
        const dietaryCategories = [...new Set(recipes.flatMap(recipe => recipe.dietaryCategories || []))];
        
        setFilterOptions({
          mealTypes,
          cuisines,
          dietaryCategories,
          difficulties: ['Easy', 'Medium', 'Hard']
        });
      }
    }
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };
  
  const resetFilters = () => {
    setFilters({
      mealType: '',
      cuisine: '',
      dietaryCategory: '',
      difficulty: ''
    });
    setSearchTerm('');
  };
  
  const handleDeleteClick = (recipe) => {
    setRecipeToDelete(recipe);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!recipeToDelete) return;
    
    try {
      await axios.delete(`/api/user/recipes/${recipeToDelete._id}`);
      
      // Remove the deleted recipe from the state
      setRecipes(prev => prev.filter(recipe => recipe._id !== recipeToDelete._id));
      
      setDeleteDialogOpen(false);
      setRecipeToDelete(null);
    } catch (err) {
      console.error('Failed to delete recipe:', err);
      // Handle error
    }
  };
  
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setRecipeToDelete(null);
  };
  
  const handleAddToCalendar = (recipe) => {
    if (onRecipeSelect) {
      onRecipeSelect(recipe);
    }
  };
  
  const getPrivacyIcon = (visibility) => {
    switch (visibility) {
      case 'private':
        return <LockIcon />;
      case 'friends':
        return <PeopleIcon />;
      case 'public':
        return <PublicIcon />;
      default:
        return null;
    }
  };
  
  const getPrivacyText = (visibility) => {
    switch (visibility) {
      case 'private':
        return 'Private';
      case 'friends':
        return 'Friends';
      case 'public':
        return 'Public';
      default:
        return 'Unknown';
    }
  };
  
  // Filter and search recipes
  const filterRecipes = (recipeList) => {
    return recipeList.filter(recipe => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Other filters
      const matchesMealType = filters.mealType === '' || recipe.mealType === filters.mealType;
      const matchesCuisine = filters.cuisine === '' || recipe.cuisine === filters.cuisine;
      const matchesDifficulty = filters.difficulty === '' || recipe.difficulty === filters.difficulty;
      
      // Dietary category filter
      const matchesDietaryCategory = filters.dietaryCategory === '' || 
        (recipe.dietaryCategories && recipe.dietaryCategories.includes(filters.dietaryCategory));
      
      return matchesSearch && matchesMealType && matchesCuisine && matchesDifficulty && matchesDietaryCategory;
    });
  };
  
  const currentRecipes = tabValue === 0 ? filterRecipes(recipes) : filterRecipes(sharedRecipes);
  
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
  
  return (
    <LibraryContainer>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label={`My Recipes (${recipes.length})`} />
          <Tab label={`Shared With Me (${sharedRecipes.length})`} />
        </Tabs>
      </Box>
      
      <FilterSection>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            sx={{ width: '60%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={toggleFilters}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </Box>
        
        {showFilters && (
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Meal Type</InputLabel>
                  <Select
                    name="mealType"
                    value={filters.mealType}
                    onChange={handleFilterChange}
                    label="Meal Type"
                  >
                    <MenuItem value="">All</MenuItem>
                    {filterOptions.mealTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Cuisine</InputLabel>
                  <Select
                    name="cuisine"
                    value={filters.cuisine}
                    onChange={handleFilterChange}
                    label="Cuisine"
                  >
                    <MenuItem value="">All</MenuItem>
                    {filterOptions.cuisines.map((cuisine) => (
                      <MenuItem key={cuisine} value={cuisine}>{cuisine}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Dietary Category</InputLabel>
                  <Select
                    name="dietaryCategory"
                    value={filters.dietaryCategory}
                    onChange={handleFilterChange}
                    label="Dietary Category"
                  >
                    <MenuItem value="">All</MenuItem>
                    {filterOptions.dietaryCategories.map((category) => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Difficulty</InputLabel>
                  <Select
                    name="difficulty"
                    value={filters.difficulty}
                    onChange={handleFilterChange}
                    label="Difficulty"
                  >
                    <MenuItem value="">All</MenuItem>
                    {filterOptions.difficulties.map((difficulty) => (
                      <MenuItem key={difficulty} value={difficulty}>{difficulty}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button variant="text" onClick={resetFilters}>
                Reset Filters
              </Button>
            </Box>
          </Box>
        )}
      </FilterSection>
      
      {currentRecipes.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="textSecondary">
            {tabValue === 0 ? 
              'You haven\'t created any recipes yet.' : 
              'No recipes have been shared with you yet.'}
          </Typography>
          {tabValue === 0 && (
            <Button 
              variant="contained" 
              color="primary"
              sx={{ mt: 2 }}
              href="/profile/recipes/create"
            >
              Create Your First Recipe
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={3}>
          {currentRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe._id}>
              <RecipeCard isusercreated={recipe.isUserCreated ? 'true' : 'false'}>
                <PrivacyBadge visibility={recipe.visibility}>
                  <Tooltip title={getPrivacyText(recipe.visibility)}>
                    {getPrivacyIcon(recipe.visibility)}
                  </Tooltip>
                </PrivacyBadge>
                
                <RecipeCardMedia
                  image={recipe.image || '/images/default-recipe.jpg'}
                  title={recipe.title}
                />
                
                <RecipeCardContent>
                  <Typography variant="h6" component="h3" noWrap>
                    {recipe.title}
                  </Typography>
                  
                  <Box display="flex" alignItems="center" mt={1} mb={1}>
                    <AccessTimeIcon fontSize="small" style={{ marginRight: 4 }} />
                    <Typography variant="body2" color="textSecondary">
                      {recipe.prepTime + recipe.cookTime} min
                    </Typography>
                    <Box ml={2} display="flex" alignItems="center">
                      <RestaurantIcon fontSize="small" style={{ marginRight: 4 }} />
                      <Typography variant="body2" color="textSecondary">
                        {recipe.difficulty}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="textSecondary" noWrap>
                    {recipe.cuisine} • {recipe.mealType}
                  </Typography>
                  
                  <Box display="flex" flexWrap="wrap" mt={1}>
                    {recipe.dietaryCategories?.slice(0, 2).map((category) => (
                      <Chip 
                        key={category} 
                        label={category} 
                        size="small" 
                        variant="outlined" 
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                    {recipe.dietaryCategories?.length > 2 && (
                      <Chip 
                        label={`+${recipe.d
(Content truncated due to size limit. Use line ranges to read in chunks)