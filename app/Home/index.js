import React, {useEffect, useState} from "react";
import { View, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import Header from "@components/Header";
import { categories } from "@data/categories"
import CategoryBox from "@components/CategoryBox";
import ProductHomeItem from "@components/ProductHomeItem";
import { products } from "@data/products"

const Home = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState()
    const [keyword, setKeyword] = useState('')
    const [selectedProducts, setSelectedProducts] = useState(products)

    const filterProducts = () => {
        let filteredProducts = products;

        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(
                (product) => product?.category === selectedCategory
            );
        }

        if (keyword) {
            filteredProducts = filteredProducts.filter(
                (product) =>
                    product?.title?.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        setSelectedProducts(filteredProducts);
    };

    // Trigger filtering when the selected category changes
    useEffect(() => {
        filterProducts();
    }, [selectedCategory]);

    // Trigger filtering when keyword changes and Enter is pressed
    const handleSearchSubmit = () => {
        filterProducts();
    };

    const renderCategoryItem = ({item}) => {
        return (
            <CategoryBox onPress={() => setSelectedCategory(item?.id)} isSelected={item.id === selectedCategory} title={item?.title} image={item?.image}/>
        )
    }

    const renderProductItem = ({item}) => {
        const onProductPress = (product) =>  {
            navigation.navigate("ProductDetails", {product})
        }
        return (
            <ProductHomeItem onPress={() => onProductPress(item)}
            {...item}/>
        )
    }
    
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Header showSearch={true} onSearchKeyword={setKeyword} keyword={keyword} title="Find All You Need"  onSubmitEditing={handleSearchSubmit}/>
                <FlatList showsHorizontalScrollIndicator={false} style={styles.list} horizontal data={categories} renderItem={renderCategoryItem} keyExtractor={(item, index) => String(index)} />
                <FlatList numColumns={2} data={selectedProducts} renderItem={renderProductItem} keyExtractor={(item) => String(item.id)} ListFooterComponent={<View style={{height: 295}}/>}/>
            </View>
        </SafeAreaView>
    )
}

export default React.memo(Home)