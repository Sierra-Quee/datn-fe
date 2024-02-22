import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICreateService, IService } from "../../utils/model";
import {
    createMultiServiceAPI,
    createServiceAPI,
    deleteServiceAPI,
    getAllServiceAPI,
    getDetailServiceAPI,
    getServiceByNameAPI,
    getServiceBySkillIdAPI,
    updateServiceAPI,
} from "../../api/service/serviceAPI";

interface IServiceSlice {
    listService: IService[];
    updateService: {
        updateServiceStatus: "success" | "failed" | "none";
        createListServiceStatus: "success" | "failed" | "none";
    };
    updateStatusService: {
        updateStatusServiceStatus: "success" | "failed" | "none";
    };
    service: {
        detailService: IService;
    };
}
const initialState: IServiceSlice = {
    listService: [],
    updateService: {
        updateServiceStatus: "none",
        createListServiceStatus: "none",
    },
    updateStatusService: {
        updateStatusServiceStatus: "none",
    },
    service: {
        detailService: {
            serviceId: "",
            name: "",
            type: "",
            price: -1,
            rate: -1,
            desc: "",
            createdAt: "",
            updatedAt: "",
            skillId: -1,
            image: "",
            isActive: false,
        },
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

export const updateServiceAsync = createAsyncThunk(
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
export const getDetailServiceAsync = createAsyncThunk(
    "detailService",
    async (id: number) => {
        return (await getDetailServiceAPI(id)).data;
    }
);
export const createMultiServiceAsync = createAsyncThunk(
    "createMulti",
    async (body: IService[]) => {
        return (await createMultiServiceAPI(body)).data;
    }
);

export const getServiceByNameAsync = createAsyncThunk(
    "getServiceByName",
    async (name: string) => {
        const response = await getServiceByNameAPI(name);
        return response.data;
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
            .addCase(getAllServiceAsync.pending, (state, action) => {})
            .addCase(getAllServiceAsync.fulfilled, (state, action) => {
                state.listService = action.payload;
            })
            .addCase(
                getAllServiceAsync.rejected,
                (state, action: PayloadAction<any>) => {}
            )
            .addCase(getServiceBySkillIdAsync.pending, (state, action) => {})
            .addCase(getServiceBySkillIdAsync.fulfilled, (state, action) => {
                state.listService = action.payload;
            })
            .addCase(
                getServiceBySkillIdAsync.rejected,
                (state, action: PayloadAction<any>) => {}
            )
            .addCase(getDetailServiceAsync.pending, (state, action) => {})
            .addCase(getDetailServiceAsync.fulfilled, (state, action) => {
                state.service.detailService = action.payload;
            })
            .addCase(
                getDetailServiceAsync.rejected,
                (state, action: PayloadAction<any>) => {}
            )
            .addCase(createServiceAsync.pending, (state, action) => {})
            .addCase(createServiceAsync.fulfilled, (state, action) => {
                state.updateService.updateServiceStatus = "success";
            })
            .addCase(
                createServiceAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.updateService.updateServiceStatus = "failed";
                }
            )
            .addCase(updateServiceAsync.pending, (state, action) => {})
            .addCase(updateServiceAsync.fulfilled, (state, action) => {
                state.updateService.updateServiceStatus = "success";
            })
            .addCase(
                updateServiceAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.updateService.updateServiceStatus = "failed";
                }
            )
            .addCase(deleteServiceAsync.pending, (state, action) => {})
            .addCase(deleteServiceAsync.fulfilled, (state, action) => {
                state.updateStatusService.updateStatusServiceStatus = "success";
            })
            .addCase(
                deleteServiceAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.updateStatusService.updateStatusServiceStatus =
                        "failed";
                }
            )

            .addCase(createMultiServiceAsync.fulfilled, (state, action) => {
                state.updateService.createListServiceStatus = "success";
            })
            .addCase(
                createMultiServiceAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.updateService.createListServiceStatus = "failed";
                }
            )
            .addCase(getServiceByNameAsync.pending, (state, action) => {})
            .addCase(getServiceByNameAsync.fulfilled, (state, action) => {
                state.listService = action.payload;
            })
            .addCase(
                getServiceByNameAsync.rejected,
                (state, action: PayloadAction<any>) => {}
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
