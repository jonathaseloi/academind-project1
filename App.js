import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList} from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from "./components/GoalInput";

export default function App() {

    const [courseGoals, setCourseGoals] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);

    const addGoalHandler = goalTitle => {
        if (goalTitle.length === 0) {
            return;
        }
        setCourseGoals(currentGoals => [...currentGoals, {id:Math.random().toString(), value: goalTitle}]);
        setIsAddMode(false);
    };

    const removeGoalHandler = goalId => {
        setCourseGoals(currentGoals => {
            return currentGoals.filter(goal => goal.id !== goalId);
        });
    };

    const cancelGoalAddHandler = () => {
        setIsAddMode(false);
    };

    return (
        <View style={styles.container}>
            <Button title="Add new Goal" onPress={() => setIsAddMode(true)}/>
            <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAddHandler}/>

            <FlatList
                data={courseGoals}
                keyExtractor={(item, index) => item.id}
                renderItem={itemData => <GoalItem id={itemData.item.id} title={itemData.item.value} onDelete={removeGoalHandler}/> }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 50
    }
});
