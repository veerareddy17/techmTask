
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    SafeAreaView,
    FlatList,
    StatusBar,
    Dimensions,
    Button,
    TextInput,
    Alert
} from 'react-native';
const listJson = require('../constants/listData.json');
const NAVBAR_HEIGHT = 100;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

const ListItem = ({ item }) => {
    return (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.text}</Text>
        </View>
    );
};

export default HomeScreen = () => {
    const sortedColumns = listJson.filter((item) => {
        if (!item.horizontal) {
            return item.data.sort((a, b) => a.text.localeCompare(b.text))
        } else {
            return item
        }
    })
    const [data, setData] = useState(sortedColumns);
    const [text, setText] = useState('');
    const [filteredArray, setFilteredArray] = useState([]);
    const [isFilter, setIsFilter] = useState(false);

    const onChangeText = (filterText) => {
        setText(filterText)
        let updateFilteredData = [...data]
        if (filterText.length >= 2) {
            setIsFilter(true)
            const filteredData = data.filter((item, index) => {
                if (!item.horizontal) {
                    const subFilter = item.data.filter(dataItem => {
                        return dataItem.text.toLocaleLowerCase().match(filterText.toLowerCase())
                    })
                    updateFilteredData[index] = { ...item, data: subFilter }
                    setFilteredArray(updateFilteredData)
                }
            })
        } else {
            setIsFilter(false);
            setFilteredArray([])
        }
    }

    const closeFilter = () => {
        setText('');
        setIsFilter(false);
        setFilteredArray([])
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <SafeAreaView style={{ flex: 1 }}>
                <SectionList
                    contentContainerStyle={{ paddingHorizontal: 10, marginTop: 40 }}
                    stickySectionHeadersEnabled={false}
                    sections={!isFilter ? data : filteredArray}
                    stickySectionHeadersEnabled={true}
                    renderSectionHeader={({ section }) => (
                        <View>
                            <Text style={styles.sectionHeader}>{section.title}</Text>
                            {section.horizontal ? (
                                <FlatList
                                    horizontal
                                    data={section.data}
                                    renderItem={({ item }) => <ListItem item={item} />}
                                    showsHorizontalScrollIndicator={false}
                                />
                            ) : null}
                        </View>
                    )}
                    renderItem={({ item, section }) => {
                        if (section.horizontal) {
                            return null;
                        }
                        return <ListItem item={item} />;
                    }}
                />
                <View style={styles.navbar}>
                    <View style={styles.headerView}>
                        <TextInput style={styles.input}
                            placeholder='filter'
                            value={text}
                            onChangeText={text => onChangeText(text)}
                        />
                        <Button
                            title="Close"
                            onPress={() => closeFilter()}
                        />
                    </View>
                </View>
            </SafeAreaView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 18,
        color: 'black',
        marginTop: 20,
        marginBottom: 5,
    },
    item: {
        margin: 10,
        flex: 1,
        width: '90%',
        height: 100,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemText: {
        color: 'black',
        marginTop: 5,

    },
    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: '#dedede',
        borderBottomWidth: 1,
        height: NAVBAR_HEIGHT,
        justifyContent: 'center',
        paddingTop: STATUS_BAR_HEIGHT,
    },
    headerView: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        marginLeft: 5,
        width: '70%'
    }
});