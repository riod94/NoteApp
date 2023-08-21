import React, {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {createNote, deleteNote, updateNote} from '../utils/storage';
import {
  CheckIcon,
  DeleteIcon,
  Input,
  View,
  KeyboardAvoidingView,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppBar from '../components/AppBar';
import theme from '../styles/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import notifee from '@notifee/react-native';

/**
 * Renders the NoteScreen component which displays a form for editing and saving notes.
 *
 * @param {object} navigation - The navigation object with methods for navigating between screens.
 * @param {object} route - The route object containing the note data to be edited.
 * @return {JSX.Element} A React component representing the NoteScreen view.
 */
function NoteScreen({navigation, route}) {
  const [state, setState] = useState({
    id: route?.params?.note?.id || null,
    title: route?.params?.note?.title || '',
    content: route?.params?.note?.content || '',
    reminder: route?.params?.note?.reminder || false,
    reminderDate: route?.params?.note?.reminderDate || new Date(),
  });
  const [showPicker, setShowPicker] = useState(false);
  const [unsaved, setUnsaved] = useState(false);
  const [rightAction, setRightAction] = useState([]);

  navigation.addListener('beforeRemove', e => {
    if (unsaved === true) {
      handleSaveNote();
    }
  });

  useEffect(() => {
    if (unsaved) {
      setRightAction([
        {
          name: 'Delete',
          icon: <DeleteIcon size={4} color={theme.colors.danger[500]} />,
          onPress: handleDeleteNote,
          color: theme.colors.danger[500],
        },
        {
          name: 'Save',
          icon: <CheckIcon size={4} color={theme.colors.info[500]} />,
          onPress: handleSaveNote,
          color: theme.colors.info[500],
        },
      ]);
    }
    if (!unsaved && state.id && (state.title || state.content)) {
      setRightAction([
        {
          name: 'Delete',
          icon: <DeleteIcon size={4} color={theme.colors.danger[500]} />,
          onPress: handleDeleteNote,
          color: theme.colors.danger[500],
        },
      ]);
    }
    return () => {
      setRightAction([]);
    };
  }, [unsaved, state, route, handleSaveNote, handleDeleteNote]);

  const handleStateChange = (key, value) => {
    setUnsaved(true);
    setState({...state, [key]: value});
  };

  const handleSaveNote = useCallback(() => {
    let dateReminder = state.reminder ? state.reminderDate : new Date();
    if (state.id) {
      updateNote(
        state.id,
        state.title,
        state.content,
        state.reminder,
        dateReminder,
      )
        .then(res => {
          setState(res);
          if (state.reminder) {
            // TODO: Handle reminder & set local notification
          } else {
            // TODO: Handle clear local notification
          }
          // navigation.goBack();
        })
        .finally(() => {
          setUnsaved(false);
        });
    } else {
      if (state.title || state.content) {
        createNote(state.title, state.content, state.reminder, dateReminder)
          .then(res => {
            setState(res);
            if (state.reminder) {
              // TODO: Handle reminder & set local notification
            } else {
              // TODO: Handle clear local notification
            }
            // navigation.goBack();
          })
          .finally(() => {
            setUnsaved(false);
          });
      }
    }
  }, [state]);

  const handleDeleteNote = useCallback(() => {
    deleteNote(route.params?.note?.id).then(() => {
      // TODO: Handle clear local notification
      navigation.goBack();
    });
  }, [navigation, route]);

  const setLocalNotification = time => {
    // const notificationId = new Date().getTime().toString();
    // PushNotification.localNotificationSchedule({
    //   id: notificationId,
    //   title: state.title || 'Note App', // (required)
    //   message: state.content || 'Reminder for your note', // (required)
    //   date: state.reminderDate || new Date(Date.now() + 60 * 1000), // in 60 secs
    //   allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
    // });
  };

  const clearLocalNotification = () => {
    // PushNotification.cancelAllLocalNotifications();
  };

  return (
    <SafeAreaView style={{flex: 1}} backgroundColor="#fff">
      <AppBar title="Notes" backButton rightItems={rightAction} />

      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View flex={1} py={2} px={4}>
          <View>
            <Input
              fontWeight="bold"
              label="Title"
              backgroundColor="inherit"
              value={state.title}
              onChangeText={text => handleStateChange('title', text)}
              placeholder="Enter title..."
              borderWidth={0}
              p={0}
            />
            <Input
              multiline
              p={0}
              borderWidth={0}
              backgroundColor="inherit"
              label="Content"
              value={state.content}
              onChangeText={text => handleStateChange('content', text)}
              placeholder="Enter content..."
            />

            {/* <HStack
              mt={6}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <Button
                onPress={() => setShowPicker(!showPicker)}
                leftIcon={<ChevronRightIcon />}
                variant="subtle">
                <Text>
                  {state.reminderDate
                    ? state.reminderDate.toLocaleString()
                    : 'Select date and time'}
                </Text>
              </Button> */}
            {showPicker && (
              <DateTimePicker
                value={new Date(state.reminderDate)}
                mode="datetime"
                display="default"
                timeZoneOffsetInMinutes={420}
                onChange={(e, selectedDateTime) => {
                  setShowPicker(false);
                  if (e.type === 'set') {
                    const currentDateTime = selectedDateTime;
                    handleStateChange('reminderDate', currentDateTime);
                  }
                }}
              />
            )}
            {/* </HStack> */}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default NoteScreen;
