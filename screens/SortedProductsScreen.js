import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

const SortedProductsScreen = () => {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState(null);

  useEffect(() => {
    
    axios.get('http://localhost:3001/produtos?_sort=nome&_order=asc')
      .then(response => setSortedProducts(response.data))
      .catch(error => console.error('Erro ao obter produtos ordenados:', error));
  }, []);

  return (
    <View>
      <DropDownPicker
        items={[
          { label: 'Nome (Ascendente)', value: 'asc' },
          { label: 'Nome (Descendente)', value: 'desc' },
        ]}
        defaultValue={selectedSortOption}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={item => setSelectedSortOption(item.value)}
      />
      {sortedProducts.map(product => (
        <View key={product.id}>
          <Text>{product.nome}</Text>
        </View>
      ))}
    </View>
  );
};

export default SortedProductsScreen;
