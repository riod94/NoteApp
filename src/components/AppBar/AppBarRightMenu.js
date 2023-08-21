import React from 'react';
import {Button, HStack, IconButton, Popover, Text} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../styles/theme';

function AppBarRightMenu({items}) {
  if (items?.length === 0) {
    return null;
  }
  
  if (items?.length >= 3) {
    return (
      <Popover
        trigger={triggerProps => (
          <IconButton
            {...triggerProps}
            rounded="full"
            icon={
              <MaterialCommunityIcons
                name="dots-vertical"
                size={18}
                color={theme.colors.primary[500]}
              />
            }
          />
        )}>
        <Popover.Content accessibilityLabel="Menus" w={'100%'}>
          <Popover.Body px={0}>
            {items.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                leftIcon={item.icon}
                onPress={() => item.onPress()}
                justifyContent={'flex-start'}
                alignItems={'flex-start'}>
                <Text color={item.color}>{item.name}</Text>
              </Button>
            ))}
          </Popover.Body>
        </Popover.Content>
      </Popover>
    );
  }
  if (items?.length > 0 && items?.length < 3) {
    return (
      <HStack>
        {items.map((item, index) => (
          <IconButton
            key={index}
            title={item.name}
            icon={item.icon}
            onPress={() => item.onPress()}
            rounded={'full'}
            size="sm"
            colorScheme={item.color}
          />
        ))}
      </HStack>
    );
  }
}

export default AppBarRightMenu;
