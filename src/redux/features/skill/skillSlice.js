import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api";

//state
const initialState = {
  skills: [],
  skill: [],
  // idle -> |pending|fulfilled|rejected|
  status: "idle",
  error: null,
};

const apiUrl = import.meta.env.VITE_BASE_URL.replace(/^http:/, "https:");

export const fetchSkills = createAsyncThunk("skill/fetchSkills", async () => {
  const response = await fetch(`${apiUrl}/skills`);
  const data = await response.json();
  return data.payload;
});
export const fetchSkillByName = createAsyncThunk(
  "skill/fetchSkillByName",
  async (name) => {
    const res = await fetch(`${apiUrl}/skills/${name}`);
    const data = await res.json();
    //console.log("data1", data)
    return data.payload;
  }
);

export const skillSlide = createSlice({
  name: "skills",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = "success";
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSkillByName.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchSkillByName.fulfilled, (state, action) => {
        state.status = "success";
        state.skill = action.payload;
      })
      .addCase(fetchSkillByName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

//export reducer
export default skillSlide.reducer;
//state.reducer.product(in initialState)
export const selectAllSkills = (state) => state.skill.skills;
export const selectSkillByName = (state) => state.skill.skill;
