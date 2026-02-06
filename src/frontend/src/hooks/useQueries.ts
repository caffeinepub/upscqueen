import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, UserRole, StudyMaterial, PreviousYearPaper, ContentType } from '../backend';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// User Role Queries
export function useGetCallerUserRole() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserRole>({
    queryKey: ['currentUserRole'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

// Study Material Queries (Public)
export function useGetAllStudyMaterials() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<StudyMaterial[]>({
    queryKey: ['studyMaterials'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStudyMaterials();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetStudyMaterialsBySubject(subject: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<StudyMaterial[]>({
    queryKey: ['studyMaterials', 'subject', subject],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStudyMaterialsBySubject(subject);
    },
    enabled: !!actor && !actorFetching && !!subject,
  });
}

// Previous Year Papers Queries (Public)
export function useGetAllPreviousYearPapers() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<PreviousYearPaper[]>({
    queryKey: ['previousYearPapers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPreviousYearPapers();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetPreviousYearPapersByExam(examName: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<PreviousYearPaper[]>({
    queryKey: ['previousYearPapers', 'exam', examName],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPreviousYearPapersByExam(examName);
    },
    enabled: !!actor && !actorFetching && !!examName,
  });
}

// Admin Mutations - Study Material
export function useAddStudyMaterial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      title: string;
      subject: string;
      contentType: ContentType;
      url: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addStudyMaterial(
        params.title,
        params.subject,
        params.contentType,
        params.url
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studyMaterials'] });
    },
    onError: (error: any) => {
      console.error('Failed to add study material:', error);
      throw new Error(
        error.message?.includes('Unauthorized')
          ? 'You do not have permission to add study materials.'
          : 'Failed to add study material. Please try again.'
      );
    },
  });
}

export function useDeleteStudyMaterial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteStudyMaterial(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studyMaterials'] });
    },
    onError: (error: any) => {
      console.error('Failed to delete study material:', error);
      throw new Error(
        error.message?.includes('Unauthorized')
          ? 'You do not have permission to delete study materials.'
          : 'Failed to delete study material. Please try again.'
      );
    },
  });
}

// Admin Mutations - Previous Year Papers
export function useAddPreviousYearPaper() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      year: bigint;
      subject: string;
      examName: string;
      url: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addPreviousYearPaper(
        params.year,
        params.subject,
        params.examName,
        params.url
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['previousYearPapers'] });
    },
    onError: (error: any) => {
      console.error('Failed to add previous year paper:', error);
      throw new Error(
        error.message?.includes('Unauthorized')
          ? 'You do not have permission to add previous year papers.'
          : 'Failed to add previous year paper. Please try again.'
      );
    },
  });
}

export function useDeletePreviousYearPaper() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deletePreviousYearPaper(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['previousYearPapers'] });
    },
    onError: (error: any) => {
      console.error('Failed to delete previous year paper:', error);
      throw new Error(
        error.message?.includes('Unauthorized')
          ? 'You do not have permission to delete previous year papers.'
          : 'Failed to delete previous year paper. Please try again.'
      );
    },
  });
}
