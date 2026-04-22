import { mainApi } from "./api";
import {
    AuthResponse,
    DashboardStats,
    ApplicationDto,
    LoginRequest,
    RegisterRequest
} from "@/types/api.types";

export const appApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: "/Auth/login",
                method: "POST",
                body: credentials,
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data));
                } catch (err) {
                    console.error(err);
                }
            },
        }),

        register: builder.mutation<{ message: string }, RegisterRequest>({
            query: (userData) => ({
                url: "/Auth/register",
                method: "POST",
                body: userData,
            }),
        }),

        getStats: builder.query<DashboardStats, void>({
            query: () => "/Dashboard/stats",
            providesTags: ["Stats"],
        }),

        createAnnouncement: builder.mutation<{ message: string }, FormData>({
            query: (formData) => ({
                url: "/Announcement/create",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Announcements", "Stats"],
        }),

        getMyApplications: builder.query<ApplicationDto[], void>({
            query: () => "/Application/my",
            providesTags: ["Applications"],
        }),

        cancelApplication: builder.mutation<{ message: string }, number>({
            query: (id) => ({
                url: `/Application/${id}/cancel`,
                method: "DELETE",
            }),
            invalidatesTags: ["Applications"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetStatsQuery,
    useCreateAnnouncementMutation,
    useGetMyApplicationsQuery,
    useCancelApplicationMutation,
} = appApi;