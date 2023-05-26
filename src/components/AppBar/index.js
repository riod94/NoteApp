import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ArrowBackIcon,
  HStack,
  IconButton,
  Text,
  ThreeDotsIcon,
} from 'native-base';
import theme from '../../styles/theme';
import AppBarRightMenu from './AppBarRightMenu';

function AppBar({
  title = '',
  renderTitle = null,
  backButton = false,
  renderHeaderLeft = null,
  rightItems = [
    {
      name: 'Sample',
      icon: <ThreeDotsIcon />,
      onPress: () => {
        console.log('Menu');
      },
      color: theme.colors.primary[500],
    },
  ],
  ...props
}) {
  const navigation = useNavigation();

  return (
    <HStack
      px="1"
      py="3"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor={props.backgroundColor || 'transparent'}
      w="100%">
      <HStack alignItems="center" justifyContent="space-between">
        {renderHeaderLeft ? (
          renderHeaderLeft
        ) : backButton === true ? (
          <IconButton
            icon={<ArrowBackIcon />}
            onPress={() => {
              navigation.goBack();
            }}
            rounded="full"
            size="sm"
            mx={2}
          />
        ) : null}
        {renderTitle ? (
          renderTitle
        ) : (
          <Text
            mx={3}
            isTruncated
            fontWeight="bold"
            color={props?.color || theme.colors.primary[700]}>
            {title}
          </Text>
        )}
      </HStack>
      {rightItems?.length > 0 && rightItems[0]?.name !== 'Sample' && (
        <AppBarRightMenu items={rightItems} />
      )}
    </HStack>
  );
}

export default AppBar;
