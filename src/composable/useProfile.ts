import { ComputedRef, ref, watch } from 'vue'

import { getProfile } from '../services/profile/getProfile'

interface UseProfileProps {
  username: ComputedRef<string>
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useProfile ({ username }: UseProfileProps) {
  const profile = ref<Profile | null>(null)

  async function fetchProfile () {
    updateProfile(null)
    const profileData = await getProfile(username.value)
    updateProfile(profileData)
  }

  function updateProfile (profileData: Profile | null) {
    profile.value = profileData
  }

  watch(username, fetchProfile, { immediate: true })

  return {
    profile,
    updateProfile,
  }
}
