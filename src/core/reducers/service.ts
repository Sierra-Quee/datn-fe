import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICreateService, IService } from "../../utils/model";
import {
    createServiceAPI,
    deleteServiceAPI,
    getAllServiceAPI,
    getServiceBySkillIdAPI,
    updateServiceAPI,
} from "../../api/service/serviceAPI";

interface IServiceSlice {
    listService: IService[];
    isLoadingService: boolean;
    updateService: {
        loadingUpdateService: boolean;
        updateServiceStatus: "success" | "failed" | "none";
    };
    updateStatusService: {
        loadingUpdateStatusService: boolean;
        updateStatusServiceStatus: "success" | "failed" | "none";
    };
}
const initialState: IServiceSlice = {
    listService: [],
    isLoadingService: false,
    updateService: {
        loadingUpdateService: false,
        updateServiceStatus: "none",
    },
    updateStatusService: {
        loadingUpdateStatusService: false,
        updateStatusServiceStatus: "none",
    },
};

export const getAllServiceAsync = createAsyncThunk(
    "getAllService",
    async () => {
        var response = await getAllServiceAPI();
        return response.data;
    }
);

export const getServiceBySkillIdAsync = createAsyncThunk(
    "getServiceBySkillId",
    async (skillId: number) => {
        return (await getServiceBySkillIdAPI(skillId)).data;
    }
);

export const createServiceAsync = createAsyncThunk(
    "createService",
    async (service: ICreateService) => {
        return (await createServiceAPI(service)).data;
    }
);

export const updadteServiceAsync = createAsyncThunk(
    "updateService",
    async (service: IService) => {
        return (await updateServiceAPI(service)).data;
    }
);

export const deleteServiceAsync = createAsyncThunk(
    "deleteService",
    async (id: string) => {
        return (await deleteServiceAPI(id)).data;
    }
);

export const ServiceSlice = createSlice({
    name: "serviceAll",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState;
        },
        setAllService: (state, action) => {
            state.listService = action.payload;
        },
        clearListService: (state) => {
            state.listService = [];
        },
        clearUpdateService: (state) => {
            return { ...state, updateService: initialState.updateService };
        },
        clearUpdateStatusService: (state) => {
            return {
                ...state,
                updateStatusService: initialState.updateStatusService,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllServiceAsync.pending, (state, action) => {
                state.isLoadingService = true;
            })
            .addCase(getAllServiceAsync.fulfilled, (state, action) => {
                state.listService = action.payload;
                state.isLoadingService = false;
            })
            .addCase(
                getAllServiceAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoadingService = false;
                }
            )
            .addCase(getServiceBySkillIdAsync.pending, (state, action) => {
                state.isLoadingService = true;
            })
            .addCase(getServiceBySkillIdAsync.fulfilled, (state, action) => {
                state.listService = action.payload;
                state.isLoadingService = false;
            })
            .addCase(
                getServiceBySkillIdAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoadingService = false;
                }
            )
            .addCase(createServiceAsync.pending, (state, action) => {
                state.updateService.loadingUpdateService = true;
            })
            .addCase(createServiceAsync.fulfilled, (state, action) => {
                state.updateService.updateServiceStatus = "success";
                state.updateService.loadingUpdateService = false;
            })
            .addCase(
                createServiceAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.updateService.updateServiceStatus = "failed";
                    state.updateService.loadingUpdateService = false;
                }
            )
            .addCase(updadteServiceAsync.pending, (state, action) => {
                state.updateService.loadingUpdateService = true;
            })
            .addCase(updadteServiceAsync.fulfilled, (state, action) => {
                state.updateService.updateServiceStatus = "success";
                state.updateService.loadingUpdateService = false;
            })
            .addCase(
                updadteServiceAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.updateService.updateServiceStatus = "failed";
                    state.updateService.loadingUpdateService = false;
                }
            )
            .addCase(deleteServiceAsync.pending, (state, action) => {
                state.updateStatusService.loadingUpdateStatusService = true;
            })
            .addCase(deleteServiceAsync.fulfilled, (state, action) => {
                state.updateStatusService.updateStatusServiceStatus = "success";
                state.updateStatusService.loadingUpdateStatusService = false;
            })
            .addCase(
                deleteServiceAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.updateStatusService.updateStatusServiceStatus =
                        "failed";
                    state.updateStatusService.loadingUpdateStatusService =
                        false;
                }
            );
    },
});

export default ServiceSlice.reducer;

export const {
    setAllService,
    clearListService,
    clearUpdateService,
    clearUpdateStatusService,
} = ServiceSlice.actions;
