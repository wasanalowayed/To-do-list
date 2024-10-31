import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, Button, StyleSheet, Image } from 'react-native'; 
import { CheckBox } from 'react-native-elements'; 
import { db } from '../firebaseConfig'; // Import your Firebase config 
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore'; 
import { uid } from 'uid'; 
 
const todo = () => { 
  const [tasks, setTasks] = useState([]); 
  const [newTask, setNewTask] = useState(''); 
  const [modalVisible, setModalVisible] = useState(false); 
  const [editingTask, setEditingTask] = useState(null); // State to hold the task being edited 
 
  // Load tasks from Firestore on component mount 
  useEffect(() => { 
    const fetchTasks = async () => { 
      const tasksCollection = collection(db, 'tasks'); 
      const taskSnapshot = await getDocs(tasksCollection); 
      const taskList = taskSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })); 
      setTasks(taskList); 
    }; 
    fetchTasks(); 
  }, []); 
 
  // Add new task to Firestore 
  const addTask = async () => { 
    if (newTask.trim() !== '') { 
      const uuId = uid(); // Generate a unique ID 
      const taskData = { title: newTask, completed: false, id: uuId }; 
 
      try { 
        await addDoc(collection(db, 'tasks'), taskData); 
        setTasks([...tasks, taskData]); 
        setNewTask(''); 
      } catch (error) { 
        console.error('Error adding task: ', error); 
      } 
    } 
    setModalVisible(false); 
  }; 
 
  // Edit an existing task in Firestore 
  const editTask = async () => { 
    if (editingTask && newTask.trim() !== '') { 
      try { 
        await updateDoc(doc(db, 'tasks', editingTask.id), { title: newTask }); 
        const updatedTasks = tasks.map((task) => 
          task.id === editingTask.id ? { ...task, title: newTask } : task 
        ); 
        setTasks(updatedTasks); 
        setEditingTask(null); 
        setNewTask(''); 
      } catch (error) { 
        console.error('Error editing task: ', error); 
      } 
    } 
    setModalVisible(false); 
  }; 
 
  // Toggle task completion status in Firestore 
  const toggleTaskCompletion = async (index) => { 
    const taskToUpdate = tasks[index]; 
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed }; 
 
    try { 
      await updateDoc(doc(db, 'tasks', taskToUpdate.id), { completed: updatedTask.completed }); 
      const updatedTasks = [...tasks]; 
      updatedTasks[index] = updatedTask; 
      setTasks(updatedTasks); 
    } catch (error) { 
      console.error('Error updating task: ', error); 
    } 
  }; 
 
  // Delete task from Firestore 
  const deleteTask = async (taskId) => { 
    try { 
      await deleteDoc(doc(db, 'tasks', taskId)); 
      const filteredTasks = tasks.filter((task) => task.id !== taskId); 
      setTasks(filteredTasks); 
    } catch (error) { 
      console.error('Error deleting task: ', error); 
    } 
  }; 
 
  // Open modal for editing an existing task 
  const openEditModal = (task) => { 
    setEditingTask(task); 
    setNewTask(task.title); 
    setModalVisible(true); 
  }; 
 
  return ( 
    <View style={styles.container}> 
      <Text style={styles.header}>Today tasks!</Text> 
      <Text style={styles.subHeader}>You have {tasks.length} task(s)</Text> 
      <FlatList 
        data={tasks} 
        renderItem={({ item, index }) => ( 
          <View style={styles.taskItem}> 
            <TouchableOpacity onPress={() => toggleTaskCompletion(index)}> 
              <CheckBox 
                checked={item.completed} 
                onPress={() => toggleTaskCompletion(index)} 
              /> 
            </TouchableOpacity> 
            <Text style={[styles.taskTitle, item.completed && styles.completedTask]}> 
              {item.title} 
            </Text> 
            <View style={styles.actions}> 
              <TouchableOpacity onPress={() => openEditModal(item)}> 
                <Image source={require('../assets/edit.png')} style={styles.icon} />
</TouchableOpacity> 
              <TouchableOpacity onPress={() => deleteTask(item.id)}> 
                <Image source={require('../assets/delete.png')} style={styles.icon} /> 
              </TouchableOpacity> 
            </View> 
          </View> 
        )} 
        keyExtractor={(item) => item.id.toString()} 
      /> 
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}> 
        <Text style={styles.addButtonText}>+</Text> 
      </TouchableOpacity> 
 
      <Modal animationType="slide" transparent={true} visible={modalVisible}> 
        <View style={styles.modalView}> 
          <TextInput 
            style={styles.input} 
            placeholder="Enter task" 
            value={newTask} 
            onChangeText={(text) => setNewTask(text)} 
          /> 
          <View style={styles.Button}> 
            <Button 
              title={editingTask ? "Edit Task" : "Add Task"} 
              onPress={editingTask ? editTask : addTask} 
              color="#95AAA1" 
            /> 
          </View> 
          <View style={styles.Button}> 
            <Button 
              title="Cancel" 
              onPress={() => { 
                setModalVisible(false); 
                setEditingTask(null); 
                setNewTask(''); 
              }} 
              color="#95AAA1" 
            /> 
          </View> 
        </View> 
      </Modal> 
    </View> 
  ); 
}; 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#EBF1E7', 
    padding: 20, 
  }, 
  header: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: '#34495E', 
  }, 
  subHeader: { 
    fontSize: 15, 
    color: '#7F8C8D', 
    marginBottom: 20, 
  }, 
  taskItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#D0E0D0', 
    padding: 10, 
    marginVertical: 8, 
    borderRadius: 8, 
    justifyContent: 'space-between', 
  }, 
  taskTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#34495E', 
  }, 
  completedTask: { 
    textDecorationLine: 'line-through', 
    color: '#95A5A6', 
  }, 
  addButton: { 
    backgroundColor: '#95AAA1', 
    height: 50, 
    width: 50, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center', 
    position: 'absolute', 
    bottom: 30, 
  }, 
  addButtonText: { 
    fontSize: 24, 
    color: 'white', 
  }, 
  modalView: { 
    backgroundColor: '#FFFFFF', 
    padding: 20, 
    margin: 30, 
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 4, 
    elevation: 5, 
  }, 
  input: { 
    borderColor: '#CCCCCC', 
    borderWidth: 1, 
    borderRadius: 8, 
    padding: 10, 
    marginBottom: 15, 
  }, 
  Button: { 
    padding: 4, 
  }, 
  actions: { 
    flexDirection: 'row', 
  }, 
  icon: { 
    width: 20, 
    height: 20, 
    marginHorizontal: 5, 
  }, 
}); 
 
export default todo;