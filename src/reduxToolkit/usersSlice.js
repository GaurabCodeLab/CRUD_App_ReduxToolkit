import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// Read Action:-
export const readData = createAsyncThunk("read", async ()=>{
    try {
        const response = await fetch('https://6532c5f0d80bd20280f607a6.mockapi.io/users');
        if(!response.ok){
            throw new Error("Something Went Wrong");
        };
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
});

// Delete Action:-
export const deleteData = createAsyncThunk("delete", async (id)=>{
  try {
    const response = await fetch(`https://6532c5f0d80bd20280f607a6.mockapi.io/users/${id}`, {
        method : "DELETE"
    });
    if(!response.ok){
        throw new Error("Something Went Wrong");
    };
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
});

// Create Action:-
export const createData = createAsyncThunk('create', async (data)=>{
    try {
        const response = await fetch('https://6532c5f0d80bd20280f607a6.mockapi.io/users', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error("Something Went Wrong");
        };
        const result = response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
});

// Update Action:-
export const updateData = createAsyncThunk('update', async ({id, updatedUser})=>{
    try {
        const response = await fetch(`https://6532c5f0d80bd20280f607a6.mockapi.io/users/${id}`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(updatedUser)
        });
        if(!response.ok){
            throw new Error("Something Went Wrong");
        };
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
})

const usersSlice = createSlice({
    name : "users",
    initialState : {
        users : [],
        loading : false,
        error : null
    },
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(readData.pending, (state)=>{
            state.loading = true;
        });
        builder.addCase(readData.fulfilled, (state, action)=>{
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(readData.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(deleteData.pending, (state)=>{
            state.loading = true;
        });
        builder.addCase(deleteData.fulfilled, (state, action)=>{
            state.loading = false;
            const {id} = action.payload;
            state.users = state.users.filter((value)=>{
                return value.id != id;
            })
        });
        builder.addCase(deleteData.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(createData.pending, (state)=>{
            state.loading = true;
        });
        builder.addCase(createData.fulfilled, (state, action)=>{
            state.loading = false;
            state.users.push(action.payload);
        });
        builder.addCase(createData.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateData.pending, (state)=>{
            state.loading = true;
        });
        builder.addCase(updateData.fulfilled, (state, action)=>{
            state.loading = false;
            const id = action.payload.id;
            const userIndex = state.users.findIndex((value)=>{
                return value.id == id;
            });
            state.users[userIndex] = action.payload;
        });
        builder.addCase(updateData.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default usersSlice.reducer;