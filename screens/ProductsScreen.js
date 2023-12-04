import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    
    axios.get('http://localhost:3001/produtos')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Erro ao obter produtos:', error));
  }, []);

  return (
    <View>
      <DropDownPicker
        items={products.map(product => ({ label: product.nome, value: product.id }))}
        defaultValue={selectedProduct}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={item => setSelectedProduct(item.value)}
      />
      {selectedProduct && (
        <View>
          <Text>Produto Selecionado:</Text>
          <Text>{products.find(product => product.id === selectedProduct).nome}</Text>
        </View>
      )}
    </View>
  );
};

export default ProductsScreen;
