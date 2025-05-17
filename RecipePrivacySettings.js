import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  FormControl, 
  FormControlLabel, 
  RadioGroup, 
  Radio, 
  Button, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  IconButton, 
  TextField, 
  InputAdornment,
  Divider,
  CircularProgress,
  Chip,
  Alert,
  Snackbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const SettingsContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  backgroundColor: '#FFF8E1',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
}));

const VisibilityOption = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const VisibilityIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: theme.palette.background.paper,
}));

const FriendsList = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '4px',
  maxHeight: '300px',
  overflowY: 'auto',
}));

const SearchBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '4px',
  marginBottom: theme.spacing(2),
}));

const RecipePrivacySettings = ({ recipeId, initialVisibility = 'private', initialSharedWith = [] }) => {
  const { data: session } = useSession();
  const [visibility, setVisibility] = useState(initialVisibility);
  const [sharedWith, setSharedWith] = useState(initialSharedWith);
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Fetch friends list on component mount
  useEffect(() => {
    if (session) {
      fetchFriends();
    }
  }, [session]);
  
  const fetchFriends = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/friends/list');
      setFriends(response.data.friends || []);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load friends:', err);
      setLoading(false);
    }
  };
  
  const handleVisibilityChange = (event) => {
    setVisibility(event.target.value);
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleAddFriend = (friend) => {
    // Check if friend is already in sharedWith
    if (!sharedWith.some(user => user._id === friend._id)) {
      setSharedWith([...sharedWith, friend]);
    }
  };
  
  const handleRemoveFriend = (friendId) => {
    setSharedWith(sharedWith.filter(friend => friend._id !== friendId));
  };
  
  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      
      // Extract just the IDs from sharedWith
      const sharedWithIds = sharedWith.map(friend => friend._id);
      
      await axios.put(`/api/user/recipes/${recipeId}/visibility`, {
        visibility,
        sharedWith: sharedWithIds
      });
      
      setSnackbar({
        open: true,
        message: 'Privacy settings saved successfully',
        severity: 'success'
      });
      
      setSaving(false);
    } catch (err) {
      console.error('Failed to save privacy settings:', err);
      
      setSnackbar({
        open: true,
        message: 'Failed to save privacy settings',
        severity: 'error'
      });
      
      setSaving(false);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };
  
  // Filter friends based on search term
  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter out friends that are already in sharedWith
  const availableFriends = filteredFriends.filter(friend => 
    !sharedWith.some(user => user._id === friend._id)
  );
  
  return (
    <SettingsContainer>
      <Typography variant="h5" gutterBottom style={{ color: '#FF5722' }}>
        Recipe Privacy Settings
      </Typography>
      
      <Box mt={3}>
        <Typography variant="subtitle1" gutterBottom>
          Who can see this recipe?
        </Typography>
        
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="visibility"
            name="visibility"
            value={visibility}
            onChange={handleVisibilityChange}
          >
            <VisibilityOption>
              <VisibilityIcon>
                <LockIcon color="action" />
              </VisibilityIcon>
              <FormControlLabel 
                value="private" 
                control={<Radio />} 
                label={
                  <Box>
                    <Typography variant="body1">Private</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Only you can see this recipe
                    </Typography>
                  </Box>
                } 
              />
            </VisibilityOption>
            
            <VisibilityOption>
              <VisibilityIcon>
                <PeopleIcon color="primary" />
              </VisibilityIcon>
              <FormControlLabel 
                value="friends" 
                control={<Radio />} 
                label={
                  <Box>
                    <Typography variant="body1">Friends</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Only your friends or selected people can see this recipe
                    </Typography>
                  </Box>
                } 
              />
            </VisibilityOption>
            
            <VisibilityOption>
              <VisibilityIcon>
                <PublicIcon style={{ color: '#4CAF50' }} />
              </VisibilityIcon>
              <FormControlLabel 
                value="public" 
                control={<Radio />} 
                label={
                  <Box>
                    <Typography variant="body1">Public</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Anyone can see this recipe
                    </Typography>
                  </Box>
                } 
              />
            </VisibilityOption>
          </RadioGroup>
        </FormControl>
      </Box>
      
      {(visibility === 'friends') && (
        <Box mt={4}>
          <Typography variant="subtitle1" gutterBottom>
            Share with specific friends
          </Typography>
          
          <SearchBox>
            <TextField
              fullWidth
              placeholder="Search friends..."
              value={searchTerm}
              onChange={handleSearchChange}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </SearchBox>
          
          {loading ? (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <>
              {availableFriends.length > 0 && (
                <>
                  <Typography variant="subtitle2" gutterBottom>
                    Add friends:
                  </Typography>
                  
                  <FriendsList>
                    <List dense>
                      {availableFriends.map((friend) => (
                        <ListItem
                          key={friend._id}
                          secondaryAction={
                            <IconButton 
                              edge="end" 
                              aria-label="add" 
                              onClick={() => handleAddFriend(friend)}
                            >
                              <PersonAddIcon />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar 
                              alt={friend.name} 
                              src={friend.profilePhotoUrl || '/images/default-avatar.png'} 
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={friend.name}
                            secondary={`@${friend.username}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </FriendsList>
                </>
              )}
              
              <Box mt={3}>
                <Typography variant="subtitle2" gutterBottom>
                  Currently shared with:
                </Typography>
                
                {sharedWith.length === 0 ? (
                  <Typography variant="body2" color="textSecondary">
                    This recipe is not shared with anyone specifically.
                  </Typography>
                ) : (
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {sharedWith.map((friend) => (
                      <Chip
                        key={friend._id}
                        avatar={<Avatar alt={friend.name} src={friend.profilePhotoUrl || '/images/default-avatar.png'} />}
                        label={friend.name}
                        onDelete={() => handleRemoveFriend(friend._id)}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </>
          )}
        </Box>
      )}
      
      <Divider sx={{ my: 4 }} />
      
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveSettings}
          disabled={saving}
          startIcon={saving && <CircularProgress size={20} color="inherit" />}
        >
          {saving ? 'Saving...' : 'Save Privacy Settings'}
        </Button>
      </Box>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SettingsContainer>
  );
};

export default RecipePrivacySettings;
