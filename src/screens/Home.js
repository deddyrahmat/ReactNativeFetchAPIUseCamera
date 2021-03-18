import React, { useState, useEffect } from 'react';
import { StyleSheet} from 'react-native';
import { Container, Content, List, ListItem, Text,} from 'native-base';

// alternative mapping
import {FlatList} from 'react-native'

// api
import axios from "axios"

const Home = (props) => {

  const [itemUsers, setItemUsers] = useState([]);

    const users = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users",{
                params: {
                _limit: 10
                }
            });
            setItemUsers(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        users();
    }, [])

    const renderItem = ({item}) => {
      return (
          <ListItem key={item.id} onPress={() => props.navigation.navigate("DetailScreen", {
            name : item.name
          })} >

              <Text>{item.name}</Text>

          </ListItem>
      )
    }

  return (
    <Container style={styles.sectionContainer}>
    <Content>
      <List>

        <FlatList
          data={itemUsers}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          />
      </List>

    </Content>
  </Container>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    fontWeight:'bold'
  },
})

export default Home
