import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Typography, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Grid, 
  Paper, 
  IconButton, 
  Chip,
  FormHelperText,
  CircularProgress,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const WizardContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  backgroundColor: '#FFF8E1',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
}));

const WizardStep = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StepButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(4),
}));

const IngredientItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const StepItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
}));

const StepNumber = styled(Box)(({ theme }) => ({
  minWidth: '30px',
  height: '30px',
  borderRadius: '50%',
  backgroundColor: '#FF9800',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  marginTop: theme.spacing(1),
}));

const ImagePreview = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: '200px',
  objectFit: 'cover',
  borderRadius: '4px',
  marginTop: theme.spacing(2),
}));

const CategoryChip = styled(Chip)(({ theme, selected }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: selected ? '#4CAF50' : 'default',
  color: selected ? 'white' : 'default',
  '&:hover': {
    backgroundColor: selected ? '#388E3C' : 'default',
  },
}));

const steps = ['Basic Information', 'Ingredients', 'Instructions', 'Details & Categories', 'Review & Save'];

const RecipeCreationWizard = ({ onComplete }) => {
  const { data: session } = useSession();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});
  
  // Form state
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: [{ name: '', quantity: '', unit: '', preparation: '' }],
    steps: [''],
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: '',
    mealType: '',
    subcategory: '',
    cuisine: '',
    dietaryCategories: [],
    notes: '',
    visibility: 'private',
    sharedWith: []
  });
  
  // Available options for select fields
  const [options, setOptions] = useState({
    difficulties: ['Easy', 'Medium', 'Hard'],
    mealTypes: ['Breakfast', 'Lunch', 'Dinner', 'Appetizer', 'Dessert', 'Snack', 'Drink', 'Other'],
    subcategories: [],
    cuisines: ['American', 'Italian', 'Mexican', 'French', 'Mediterranean', 'Asian', 'Indian', 'Middle Eastern', 'Greek', 'Thai', 'Japanese', 'Chinese', 'Spanish', 'Korean', 'Vietnamese', 'German', 'British', 'Caribbean', 'African', 'Other'],
    dietaryCategories: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Low-Carb', 'High-Protein', 'Keto', 'Paleo', 'Nut-Free', 'Soy-Free', 'Egg-Free', 'Pescatarian']
  });
  
  // Fetch subcategories based on meal type
  useEffect(() => {
    if (recipe.mealType) {
      fetchSubcategories(recipe.mealType);
    }
  }, [recipe.mealType]);
  
  const fetchSubcategories = async (mealType) => {
    try {
      const response = await axios.get(`/api/user/calendar/subcategories?mealType=${mealType.toLowerCase()}`);
      setOptions(prev => ({
        ...prev,
        subcategories: response.data.subcategories || []
      }));
    } catch (err) {
      console.error('Failed to load subcategories:', err);
    }
  };
  
  const handleNext = () => {
    if (validateCurrentStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const validateCurrentStep = () => {
    const newErrors = {};
    
    switch (activeStep) {
      case 0: // Basic Information
        if (!recipe.title.trim()) newErrors.title = 'Title is required';
        if (!recipe.description.trim()) newErrors.description = 'Description is required';
        break;
        
      case 1: // Ingredients
        recipe.ingredients.forEach((ingredient, index) => {
          if (!ingredient.name.trim()) newErrors[`ingredient_${index}_name`] = 'Name is required';
          if (!ingredient.quantity.trim()) newErrors[`ingredient_${index}_quantity`] = 'Quantity is required';
          if (!ingredient.unit.trim()) newErrors[`ingredient_${index}_unit`] = 'Unit is required';
        });
        break;
        
      case 2: // Instructions
        recipe.steps.forEach((step, index) => {
          if (!step.trim()) newErrors[`step_${index}`] = 'Step cannot be empty';
        });
        break;
        
      case 3: // Details & Categories
        if (!recipe.prepTime) newErrors.prepTime = 'Prep time is required';
        if (!recipe.cookTime) newErrors.cookTime = 'Cook time is required';
        if (!recipe.servings) newErrors.servings = 'Servings is required';
        if (!recipe.difficulty) newErrors.difficulty = 'Difficulty is required';
        if (!recipe.mealType) newErrors.mealType = 'Meal type is required';
        if (!recipe.subcategory) newErrors.subcategory = 'Subcategory is required';
        if (!recipe.cuisine) newErrors.cuisine = 'Cuisine is required';
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value
    };
    
    setRecipe(prev => ({
      ...prev,
      ingredients: updatedIngredients
    }));
  };
  
  const addIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '', unit: '', preparation: '' }]
    }));
  };
  
  const removeIngredient = (index) => {
    if (recipe.ingredients.length > 1) {
      const updatedIngredients = [...recipe.ingredients];
      updatedIngredients.splice(index, 1);
      
      setRecipe(prev => ({
        ...prev,
        ingredients: updatedIngredients
      }));
    }
  };
  
  const handleStepChange = (index, value) => {
    const updatedSteps = [...recipe.steps];
    updatedSteps[index] = value;
    
    setRecipe(prev => ({
      ...prev,
      steps: updatedSteps
    }));
  };
  
  const addStep = () => {
    setRecipe(prev => ({
      ...prev,
      steps: [...prev.steps, '']
    }));
  };
  
  const removeStep = (index) => {
    if (recipe.steps.length > 1) {
      const updatedSteps = [...recipe.steps];
      updatedSteps.splice(index, 1);
      
      setRecipe(prev => ({
        ...prev,
        steps: updatedSteps
      }));
    }
  };
  
  const handleDietaryToggle = (category) => {
    const currentCategories = [...recipe.dietaryCategories];
    const categoryIndex = currentCategories.indexOf(category);
    
    if (categoryIndex === -1) {
      // Add category
      currentCategories.push(category);
    } else {
      // Remove category
      currentCategories.splice(categoryIndex, 1);
    }
    
    setRecipe(prev => ({
      ...prev,
      dietaryCategories: currentCategories
    }));
  };
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // First upload image if exists
      let imageUrl = '';
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const imageResponse = await axios.post('/api/user/recipes/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        imageUrl = imageResponse.data.imageUrl;
      }
      
      // Then create recipe
      const recipeData = {
        ...recipe,
        image: imageUrl
      };
      
      const response = await axios.post('/api/user/recipes', recipeData);
      
      setLoading(false);
      
      // Call onComplete callback with the created recipe
      if (onComplete) {
        onComplete(response.data.recipe);
      }
    } catch (err) {
      setLoading(false);
      console.error('Failed to create recipe:', err);
      // Handle error
    }
  };
  
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <WizardStep>
            <Typography variant="h6" gutterBottom>Basic Recipe Information</Typography>
            
            <TextField
              fullWidth
              label="Recipe Title"
              name="title"
              value={recipe.title}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              error={!!errors.title}
              helperText={errors.title}
              required
            />
            
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={recipe.description}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description}
              required
            />
            
            <Box mt={3}>
              <Typography variant="subtitle1" gutterBottom>Recipe Image (Optional)</Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<PhotoCameraIcon />}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              
              {imagePreview && (
                <Box mt={2}>
                  <ImagePreview src={imagePreview} alt="Recipe preview" />
                </Box>
              )}
              
              <Typography variant="caption" color="textSecondary" display="block" mt={1}>
                You can also add or update the image later
              </Typography>
            </Box>
          </WizardStep>
        );
        
      case 1:
        return (
          <WizardStep>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Ingredients</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addIngredient}
              >
                Add Ingredient
              </Button>
            </Box>
            
            {recipe.ingredients.map((ingredient, index) => (
              <IngredientItem key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Quantity"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                      margin="dense"
                      variant="outlined"
                      error={!!errors[`ingredient_${index}_quantity`]}
                      helperText={errors[`ingredient_${index}_quantity`]}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={2}>
                    <TextField
                      fullWidth
                      label="Unit"
                      value={ingredient.unit}
                      onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                      margin="dense"
                      variant="outlined"
                      error={!!errors[`ingredient_${index}_unit`]}
                      helperText={errors[`ingredient_${index}_unit`]}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Ingredient Name"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      margin="dense"
                      variant="outlined"
                      error={!!errors[`ingredient_${index}_name`]}
                      helperText={errors[`ingredient_${index}_name`]}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={2}>
                    <TextField
                      fullWidth
                      label="Preparation"
                      value={ingredient.preparation}
                      onChange={(e) => handleIngredientChange(index, 'preparation', e.target.value)}
                      margin="dense"
                      variant="outlined"
                      placeholder="e.g., chopped"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={1} display="flex" alignItems="center" justifyContent="center">
                    <IconButton 
                      color="error" 
                      onClick={() => removeIngredient(index)}
                      disabled={recipe.ingredients.length <= 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </IngredientItem>
            ))}
          </WizardStep>
        );
        
      case 2:
        return (
          <WizardStep>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Cooking Instructions</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addStep}
              >
                Add Step
              </Button>
            </Box>
            
            {recipe.steps.map((step, index) => (
              <StepItem key={index}>
                <StepNumber>{index + 1}</StepNumber>
                <Box flexGrow={1}>
                  <TextField
                    fullWidth
                    label={`Step ${index + 1}`}
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    margin="dense"
                    variant="outlined"
                    multiline
                    rows={
(Content truncated due to size limit. Use line ranges to read in chunks)