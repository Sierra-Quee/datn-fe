import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getSystemConfigApi,
    updateSystemConfigApi,
} from "../../api/system-config/SystemConfigApi";
import { ISystemConfig } from "../../utils/model";

interface ISystemConfigSlice {
    config?: ISystemConfig;
    isLoadingSystemConfig: boolean;
    updateSystemConfig: {
        updatingSystemConfig: boolean;
        updateSystemConfigStatus: "success" | "failed" | "none";
    };
}

const initialState: ISystemConfigSlice = {
    config: undefined,
    isLoadingSystemConfig: false,
    updateSystemConfig: {
        updateSystemConfigStatus: "none",
        updatingSystemConfig: false,
    },
};

export const getSystemConfigAsync = createAsyncThunk(
    "getSystemConfig",
    async () => {
        const response = await getSystemConfigApi();
        return response.data;
    }
);

export const updateSystemConfigAsync = createAsyncThunk(
    "updateSystemConfig",
    async (dto: ISystemConfig) => {
        const response = await updateSystemConfigApi(dto);
        return response.data;
    }
);

export const SystemConfigSlice = createSlice({
    name: "SystemConfig",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSystemConfigAsync.pending, (state, action) => {
                state.isLoadingSystemConfig = true;
            })
            .addCase(getSystemConfigAsync.fulfilled, (state, action) => {
                state.isLoadingSystemConfig = false;
                state.config = action.payload;
            })
            .addCase(getSystemConfigAsync.rejected, (state, action) => {
                state.isLoadingSystemConfig = false;
            })
            .addCase(updateSystemConfigAsync.pending, (state, action) => {
                state.updateSystemConfig.updatingSystemConfig = true;
            })
            .addCase(updateSystemConfigAsync.fulfilled, (state, acion) => {
                state.updateSystemConfig.updateSystemConfigStatus = "success";
                state.updateSystemConfig.updatingSystemConfig = false;
            })
            .addCase(updateSystemConfigAsync.rejected, (state, action) => {
                state.updateSystemConfig.updatingSystemConfig = false;
                state.updateSystemConfig.updateSystemConfigStatus = "failed";
            });
    },
});

export default SystemConfigSlice.reducer;
