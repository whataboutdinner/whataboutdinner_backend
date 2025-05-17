import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  CircularProgress,
  Collapse,
  IconButton,
  TextField,
  Chip,
  Grid,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const MealCard = styled(Card)(({ theme, mealtype }) => ({
  backgroundColor: mealtype === 'lunch' ? '#FFF3E0' : '#FFF8E1',
  borderRadius: '0 0 4px 4px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  position: 'relative',
  overflow: 'visible'
}));

const MealTypeLabel = styled(Box)(({ theme, mealtype }) => ({
  position: 'absolute',
  top: '-12px',
  left: '10px',
  padding: '2px 8px',
  backgroundColor: mealtype === 'lunch' ? '#FB8C00' : '#FF9800',
  color: 'white',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  zIndex: 1
}));

const GenerateButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4CAF50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#388E3C',
  },
  marginTop: theme.spacing(1)
}));

const RegenerateButton = styled(IconButton)(({ theme }) => ({
  color: '#FF5722',
  '&:hover': {
    backgroundColor: 'rgba(255, 87, 34, 0.1)',
  },
}));

const FeedbackButton = styled(IconButton)(({ theme, active }) => ({
  color: active ? '#4CAF50' : 'rgba(0, 0, 0, 0.54)',
  '&:hover': {
    backgroundColor: active ? 'rgba(76, 175, 80, 0.1)' : 'rgba(0, 0, 0, 0.04)',
  },
}));

const ExpandButton = styled(IconButton)(({ theme, expanded }) => ({
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipeImage = styled('img')({
  width: '100%',
  height: '120px',
  objectFit: 'cover',
  borderRadius: '4px',
});

const DietaryChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  fontSize: '0.7rem',
}));

const DayMealCard = ({ 
  dayOfWeek, 
  mealType, 
  subcategories, 
  dayEntry, 
  onSubcategoryChange, 
  onGenerateRecipe, 
  onFeedback 
}) => {
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(dayEntry?.feedback?.notes || '');
  
  const handleSubcategoryChange = (event) => {
    onSubcategoryChange(event.target.value);
  };
  
  const handleGenerateRecipe = async () => {
    setLoading(true);
    await onGenerateRecipe();
    setLoading(false);
  };
  
  const handleFeedback = (liked) => {
    onFeedback(liked, dayEntry?.feedback?.makeAgain || false, notes);
  };
  
  const handleMakeAgain = () => {
    onFeedback(
      dayEntry?.feedback?.liked, 
      !dayEntry?.feedback?.makeAgain, 
      notes
    );
  };
  
  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };
  
  const handleSaveNotes = () => {
    onFeedback(
      dayEntry?.feedback?.liked, 
      dayEntry?.feedback?.makeAgain, 
      notes
    );
  };
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const capitalizedMealType = mealType.charAt(0).toUpperCase() + mealType.slice(1);
  
  return (
    <MealCard mealtype={mealType}>
      <MealTypeLabel mealtype={mealType}>{capitalizedMealType}</MealTypeLabel>
      <CardContent>
        <FormControl fullWidth size="small" margin="normal">
          <InputLabel id={`${dayOfWeek}-${mealType}-subcategory-label`}>Subcategory</InputLabel>
          <Select
            labelId={`${dayOfWeek}-${mealType}-subcategory-label`}
            id={`${dayOfWeek}-${mealType}-subcategory`}
            value={dayEntry?.subcategory || ''}
            label="Subcategory"
            onChange={handleSubcategoryChange}
          >
            {subcategories.map((subcategory) => (
              <MenuItem key={subcategory} value={subcategory}>
                {subcategory}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {!dayEntry?.recipe ? (
          <Box display="flex" justifyContent="center" mt={1}>
            <GenerateButton
              onClick={handleGenerateRecipe}
              disabled={loading || !dayEntry?.subcategory}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              Generate Recipe
            </GenerateButton>
          </Box>
        ) : (
          <Box mt={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" component="h3" noWrap>
                {dayEntry.recipe.title}
              </Typography>
              <RegenerateButton 
                aria-label="regenerate" 
                onClick={handleGenerateRecipe}
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : <RefreshIcon />}
              </RegenerateButton>
            </Box>
            
            {dayEntry.recipe.image ? (
              <Box mt={1} mb={1}>
                <RecipeImage src={dayEntry.recipe.image} alt={dayEntry.recipe.title} />
              </Box>
            ) : null}
            
            <Box display="flex" alignItems="center" mt={1} mb={1}>
              <AccessTimeIcon fontSize="small" style={{ marginRight: 4 }} />
              <Typography variant="body2" color="textSecondary">
                {dayEntry.recipe.prepTime + dayEntry.recipe.cookTime} min
              </Typography>
              <Box ml={2} display="flex" alignItems="center">
                <RestaurantIcon fontSize="small" style={{ marginRight: 4 }} />
                <Typography variant="body2" color="textSecondary">
                  {dayEntry.recipe.difficulty}
                </Typography>
              </Box>
            </Box>
            
            <Box display="flex" flexWrap="wrap" mb={1}>
              {dayEntry.recipe.dietaryCategories?.slice(0, 3).map((category) => (
                <DietaryChip 
                  key={category} 
                  label={category} 
                  size="small" 
                  variant="outlined" 
                  color="primary"
                />
              ))}
            </Box>
            
            <Divider />
            
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              <Box>
                <FeedbackButton 
                  aria-label="like" 
                  active={dayEntry.feedback?.liked === true ? 1 : 0}
                  onClick={() => handleFeedback(true)}
                >
                  <ThumbUpIcon />
                </FeedbackButton>
                <FeedbackButton 
                  aria-label="dislike" 
                  active={dayEntry.feedback?.liked === false ? 1 : 0}
                  onClick={() => handleFeedback(false)}
                >
                  <ThumbDownIcon />
                </FeedbackButton>
                <IconButton 
                  aria-label="make again" 
                  color={dayEntry.feedback?.makeAgain ? "secondary" : "default"}
                  onClick={handleMakeAgain}
                >
                  {dayEntry.feedback?.makeAgain ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
              </Box>
              
              <ExpandButton
                expanded={expanded ? 1 : 0}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandButton>
            </Box>
            
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box mt={2}>
                <Typography variant="subtitle2">Description:</Typography>
                <Typography variant="body2" paragraph>
                  {dayEntry.recipe.description}
                </Typography>
                
                <Typography variant="subtitle2">Notes:</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  size="small"
                  value={notes}
                  onChange={handleNotesChange}
                  placeholder="Add your notes about this recipe..."
                  margin="normal"
                />
                <Button 
                  size="small" 
                  variant="outlined" 
                  onClick={handleSaveNotes}
                  style={{ marginTop: 8 }}
                >
                  Save Notes
                </Button>
              </Box>
            </Collapse>
          </Box>
        )}
      </CardContent>
    </MealCard>
  );
};

export default DayMealCard;
