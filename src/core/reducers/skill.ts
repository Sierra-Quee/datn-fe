import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createMultiSkillAPI,
    createSkillAPI,
    getAllSkillAPI,
    getSkillByIdAPI,
    updateSkillAPI,
    updateStatusSkillAPI,
} from "../../api/skill/skillAPI";
import { ISkill } from "../../utils/model";

interface ISkillSlice {
    listSkill: ISkill[];
    skill?: ISkill | null | undefined;
    updateSkill: {
        updateSkillStatus: "success" | "failed" | "none";
        createMulSkillStatus: "success" | "failed" | "none";
    };
    updateStatusSkill: {
        updateStatusSkillStatus: "success" | "failed" | "none";
    };
}
const initialState: ISkillSlice = {
    listSkill: [],
    skill: null,
    updateSkill: {
        updateSkillStatus: "none",
        createMulSkillStatus: "none",
    },
    updateStatusSkill: {
        updateStatusSkillStatus: "none",
    },
};

export const getAllSkillAsync = createAsyncThunk("getSkill", async () => {
    var response = await getAllSkillAPI();
    return response.data;
});

export const createSkillAsync = createAsyncThunk(
    "createSkill",
    async (skill: ISkill) => {
        return (await createSkillAPI(skill)).data;
    }
);

export const updateSkillAsync = createAsyncThunk(
    "updateSkill",
    async (skill: ISkill) => {
        return (await updateSkillAPI(skill)).data;
    }
);

export const updateStatusSkillAsync = createAsyncThunk(
    "updateStatusSkill",
    async (skillId: number) => {
        return (await updateStatusSkillAPI(skillId)).data;
    }
);

export const getSkillByIdAsync = createAsyncThunk(
    "getSkillById",
    async (skillId: number) => {
        return (await getSkillByIdAPI(skillId)).data;
    }
);
export const createMultiSkillAsync = createAsyncThunk(
    "skill/createMulti",
    async (body: ISkill[]) => {
        return (await createMultiSkillAPI(body)).data;
    }
);

export const skillSlice = createSlice({
    name: "skillAll",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState;
        },
        setAllSkill: (state, action) => {
            state.listSkill = action.payload;
        },
        clearUpdateSkill: (state) => {
            return { ...state, updateSkill: initialState.updateSkill };
        },
        clearSkill: (state) => {
            return { ...state, skill: initialState.skill };
        },
        clearUpdateStatusSkill: (state) => {
            return {
                ...state,
                updateStatusSkill: initialState.updateStatusSkill,
            };
        },
        clearListSkill: (state) => {
            state.listSkill = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllSkillAsync.pending, (state, action) => {})
            .addCase(getAllSkillAsync.fulfilled, (state, action) => {
                state.listSkill = action.payload;
            })
            .addCase(
                getAllSkillAsync.rejected,
                (state, action: PayloadAction<any>) => {}
            )
            .addCase(getSkillByIdAsync.pending, (state, action) => {})
            .addCase(getSkillByIdAsync.fulfilled, (state, action) => {
                state.skill = action.payload;
            })
            .addCase(
                getSkillByIdAsync.rejected,
                (state, action: PayloadAction<any>) => {}
            )
            .addCase(createSkillAsync.pending, (state, action) => {})
            .addCase(createSkillAsync.fulfilled, (state, action) => {
                state.updateSkill.updateSkillStatus = "success";
            })
            .addCase(
                createSkillAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.updateSkill.updateSkillStatus = "failed";
                }
            )
            .addCase(updateSkillAsync.pending, (state, action) => {})
            .addCase(updateSkillAsync.fulfilled, (state, action) => {
                state.updateSkill.updateSkillStatus = "success";
            })
            .addCase(
                updateSkillAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.updateSkill.updateSkillStatus = "failed";
                }
            )
            .addCase(updateStatusSkillAsync.pending, (state, action) => {})
            .addCase(updateStatusSkillAsync.fulfilled, (state, action) => {
                state.updateStatusSkill.updateStatusSkillStatus = "success";
            })
            .addCase(
                updateStatusSkillAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.updateStatusSkill.updateStatusSkillStatus = "failed";
                }
            )
            .addCase(createMultiSkillAsync.fulfilled, (state, action) => {
                state.updateSkill.createMulSkillStatus = "success";
            })
            .addCase(
                createMultiSkillAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.updateSkill.createMulSkillStatus = "failed";
                }
            );
    },
});

export default skillSlice.reducer;
export const {
    setAllSkill,
    clearUpdateSkill,
    clearSkill,
    clearUpdateStatusSkill,
    clearListSkill,
} = skillSlice.actions;
