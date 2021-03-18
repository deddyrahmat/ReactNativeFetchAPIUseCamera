import React, { useState, useEffect } from 'react';
import { StyleSheet} from 'react-native';
import { Button, Container, Content, List, ListItem, Text,} from 'native-base';
import {Picker} from '@react-native-picker/picker';


// alternative mapping
import {FlatList} from 'react-native'

// api
import axios from "axios"

const Detail = (props) => {

  const [itemUsers, setItemUsers] = useState([]);

  const [selectedProvinsi, setSelectedProvinsi] = useState();

  const [selectedKota, setSelectedKota] = useState();

  const [selectedKecamatan, setSelectedKecamatan] = useState();

  const [selectedKelurahan, setSelectedKelurahan] = useState();

  const [selectedPos, setSelectedPos] = useState();

  const [provinsi, setProvinsi] = useState([]);

  const [kota, setKota] = useState([]);

  const [kecamatan, setKecamatan] = useState([]);

  const [kelurahan, setKelurahan] = useState([]);

  const [pos, setPos] = useState([]);

    const provinsiData = async () => {
        try {
          const response = await axios.get('https://kodepos-2d475.firebaseio.com/list_propinsi.json?print=pretty');

          let result = [];
    
          for (const [index  ,value] of Object.entries(response.data))
          {result.push({id: index, name: value});}
    
          setProvinsi(result);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        provinsiData();
    }, [])


    // Kota

    const kotaData = async () => {
      try {
        const response = await axios.get(`https://kodepos-2d475.firebaseio.com/list_kotakab/${selectedProvinsi}.json?print=pretty`);
  
        let resultKota = [];
  
        for (const [index  ,value] of Object.entries(response.data))
        {resultKota.push({id: index, name: value});}
  
        setKota(resultKota);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      kotaData();
    }, [selectedProvinsi])

    // kecamatan
    const kecamatanData = async () => {
      try {
        const response = await axios.get(`https://kodepos-2d475.firebaseio.com/kota_kab/${selectedKota}.json?print=pretty`);
  
        const mapKecamatan = response.data.map(kec =>  kec.kecamatan );

        console.log('coba set kecamatan', new Set(mapKecamatan));
        setKecamatan([...new Set(mapKecamatan)])
  
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      kecamatanData();
    }, [selectedKota])


    // kelurahan
    const kelurahanData = async () => {
      try {
        const response = await axios.get(`https://kodepos-2d475.firebaseio.com/kota_kab/${selectedKota}.json?print=pretty`);
  
        const mapKelurahan = response.data.map(kel =>  {
          return kel.kelurahan
        } );

        console.log('coba set Kelurahan', new Set(mapKelurahan));
        setKelurahan([...new Set(mapKelurahan)])
  
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      kelurahanData();
    }, [selectedKecamatan])

    // pos
    const posData = async () => {
      try {
        const response = await axios.get(`https://kodepos-2d475.firebaseio.com/kota_kab/${selectedKota}.json?print=pretty`);
  
        const mapPos = response.data.find(pos => pos.kelurahan == selectedKelurahan );

        setPos(mapPos)
  
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      posData();
    }, [selectedKelurahan])

  return (
    <Container style={styles.sectionContainer}>
      <Content>
        <Text style={styles.titleDetail}> {props.route.params.name}</Text>

        {/* Provinsi */}
        <Picker
          selectedValue={selectedProvinsi}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedProvinsi(itemValue)
          }>

          <Picker.Item label="Pilih Provinsi" value="" />
          {
            provinsi.map(pro => (
              <Picker.Item key={pro.id} label={pro.name} value={pro.id} />
            ))
          }
        </Picker>

        {/* Kota */}
        <Picker
          selectedValue={selectedKota}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedKota(itemValue)
          }>

          <Picker.Item label="Pilih Kota" value="" />
          {
            kota.map(pro => (
              <Picker.Item key={pro.id} label={pro.name} value={pro.id} />
            ))
          }
        </Picker>

        {/* Kecamatan */}
        <Picker
          selectedValue={selectedKecamatan}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedKecamatan(itemValue)
          }>
            
          <Picker.Item label="Pilih Kecamatan" value="" />
          {
            kecamatan.map(kec => (
              <Picker.Item key={kec} label={kec} value={kec} />
            ))
          }
        </Picker>

        {/* kelurahan */}
        <Picker
          selectedValue={selectedKelurahan}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedKelurahan(itemValue)
          }>
            
          <Picker.Item label="Pilih Kelurahan" value="" />
          {
            kelurahan.map(kel => (
              <Picker.Item key={kel} label={kel} value={kel} />
            ))
          }
        </Picker>


        {/* pos */}
        <List>
            <ListItem>
              <Text>
                Kode Pos : 
                {
                  pos.kodepos
                }
              </Text>
            </ListItem>
        </List>
        

        <Button block info style={styles.btnSnap} onPress={() => props.navigation.navigate("SnapScreen")}>
          <Text style={styles.btnCamera}>Camera</Text>
        </Button>

      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    fontWeight:'bold'
  },
  titleDetail: {
    textAlign : 'center',
    marginTop : 20,
    marginBottom : 20,
    fontSize : 30,
    fontWeight : 'bold'
  },
  btnSnap : {
    marginTop : 50
  },
  btnCamera : {
    fontWeight : 'bold'
  }
})

export default Detail
