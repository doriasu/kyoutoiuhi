import {GetterTree, MutationTree} from 'vuex'
export const state = () => ({
  user_id: ""
})
export type RootState = ReturnType<typeof state>

export const mutations:MutationTree<RootState> = {
  LOGIN:(state,id:string)=>(state.user_id=id),
}
export const getters: GetterTree<RootState, RootState> = {
  user_id:state=>state.user_id,
}
