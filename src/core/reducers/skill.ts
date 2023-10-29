import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSkillApi } from "../../api/otherApi/otherApi";
import { ISkill } from "../../utils/model";

interface ISkillSlice {
    skill: ISkill;
    isLoadingSkill: boolean;
}
const initialState = {
    skill: {
        serviceId: -1,
        name: "",
        type: -1,
        price: 0,
        rate: -1,
        desc: "",
        createdAt: "",
        updatedAt: "",
        skillId: -1,
        skill: {},
        image: "",
    },
    isLoadingSkill: false,
};

export const getAllSkillAsync = createAsyncThunk("skill", async () => {
    var response = await getAllSkillApi();
    return response.data;
});

export const skillSlice = createSlice({
    name: "skillAll",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState;
        },
        setAllSkill: (state, action) => {
            state.skill = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllSkillAsync.pending, (state, action) => {
                state.isLoadingSkill = true;
            })
            .addCase(getAllSkillAsync.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.skill = data;
                state.isLoadingSkill = false;
            })
            .addCase(
                getAllSkillAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoadingSkill = false;
                }
            );
    },
});

export default skillSlice.reducer;
export const { setAllSkill } = skillSlice.actions;
