/*
 * 树相关 
 * @Author: liyan52 
 * @Date: 2020-07-23 08:58:03 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-23 10:20:05
 */
/**
 * 最近公共祖先
 * @param {*} root 
 * @param {*} p 
 * @param {*} q 
 */
export function LCA(root,p,q){
    if(root == null) return null
    if(root == p || root == q)return root
    let left =LCA(root.left,p,q)
    let right = LCA(root.right,p,q)
    if(left != null && right != null)return root
    if(left == null) return right
    return left
}
/**
 * 二叉树的最大深度
 * @param {*} root 
 */
export function maxDepth(root){
    return root == null? 0: Math.max(maxDepth(root.left),maxDepth(root.right))+1
}