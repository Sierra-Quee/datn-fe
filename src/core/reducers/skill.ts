import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISkill } from "../../utils/model";
import {
    createSkillAPI,
    getAllSkillAPI,
    getSkillByIdAPI,
    updateSkillAPI,
    updateStatusSkillAPI,
} from "../../api/skill/skillAPI";

interface ISkillSlice {
    listSkill: ISkill[];
    loadingSkill: boolean;
    skill?: ISkill | null | undefined;
    updateSkill: {
        loadingUpdateSkill: boolean;
        updateSkillStatus: "success" | "failed" | "none";
    };
    updateStatusSkill: {
        loadingUpdateStatusSkill: boolean;
        updateStatusSkillStatus: "success" | "failed" | "none";
    };
}
const initialState: ISkillSlice = {
    listSkill: [],
    loadingSkill: false,
    skill: null,
    updateSkill: {
        loadingUpdateSkill: false,
        updateSkillStatus: "none",
    },
    updateStatusSkill: {
        loadingUpdateStatusSkill: false,
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
            .addCase(getAllSkillAsync.pending, (state, action) => {
                state.loadingSkill = true;
            })
            .addCase(getAllSkillAsync.fulfilled, (state, action) => {
                state.listSkill = action.payload;
                state.loadingSkill = false;
            })
            .addCase(
                getAllSkillAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loadingSkill = false;
                }
            )
            .addCase(getSkillByIdAsync.pending, (state, action) => {
                state.loadingSkill = true;
            })
            .addCase(getSkillByIdAsync.fulfilled, (state, action) => {
                state.skill = action.payload;
                state.loadingSkill = false;
            })
            .addCase(
                getSkillByIdAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loadingSkill = false;
                }
            )
            .addCase(createSkillAsync.pending, (state, action) => {
                state.updateSkill.loadingUpdateSkill = true;
            })
            .addCase(createSkillAsync.fulfilled, (state, action) => {
                state.updateSkill.loadingUpdateSkill = false;
                state.updateSkill.updateSkillStatus = "success";
            })
            .addCase(
                createSkillAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.updateSkill.loadingUpdateSkill = false;
                    state.updateSkill.updateSkillStatus = "failed";
                }
            )
            .addCase(updateSkillAsync.pending, (state, action) => {
                state.updateSkill.loadingUpdateSkill = true;
            })
            .addCase(updateSkillAsync.fulfilled, (state, action) => {
                state.updateSkill.loadingUpdateSkill = false;
                state.updateSkill.updateSkillStatus = "success";
            })
            .addCase(
                updateSkillAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.updateSkill.loadingUpdateSkill = false;
                    state.updateSkill.updateSkillStatus = "failed";
                }
            )
            .addCase(updateStatusSkillAsync.pending, (state, action) => {
                state.updateStatusSkill.loadingUpdateStatusSkill = true;
            })
            .addCase(updateStatusSkillAsync.fulfilled, (state, action) => {
                state.updateStatusSkill.loadingUpdateStatusSkill = false;
                state.updateStatusSkill.updateStatusSkillStatus = "success";
            })
            .addCase(
                updateStatusSkillAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.updateStatusSkill.loadingUpdateStatusSkill = false;
                    state.updateStatusSkill.updateStatusSkillStatus = "failed";
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
