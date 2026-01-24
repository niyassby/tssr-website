import { apiSevice } from "@/API/Service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useDlHallTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => {
        return apiSevice.downloadHallTicket(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries("hall-ticket");
      },
    });
  };

export const useResultCheck = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => {
        return apiSevice.getResult(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries("result");
      },
    });
  };

export const useRequestAtc = () => {
    return useMutation({
      mutationFn: (data) => {
        return apiSevice.requestAtc(data);
      }
    });
  };
export const useVerifyCertificate = () => {
    return useMutation({
      mutationFn: (data) => {
        return apiSevice.verifyCertificate(data);
      }
    });
  };
export const useATCVerifyCertificate = () => {
    return useMutation({
      mutationFn: (data) => {
        return apiSevice.verifyATC(data);
      }
    });
  };

  export const useAllCourse = () => {
    return useQuery({
      queryKey: ["coures", ],
      queryFn: () => apiSevice.getCourses(),
      keepPreviousData: true,
    });
  };

  export const useAllGalleryPost = () => {
    return useQuery({
      queryKey: ["gallery"],
      queryFn: () => apiSevice.getAllPost(),
      keepPreviousData: true,
    });
  };