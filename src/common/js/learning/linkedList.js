/*
 * description 
 * @Author: liyan52 
 * @Date: 2020-07-21 11:02:21 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-07-22 15:22:06
 */
// 题目一：从尾到头打印链表
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function(head) {

    let stack=[]//使用栈
    while(head != null){
        stack.unshift(head.val)
        head=head.next
    }
    return stack
};
var reversePrint =function(head){
    if(head.next != null){
        reversePrint(head.next)
    }
    console.log(head.val)
}
// 题目二：反转链表
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev=null,cur=head,tmp
    while(cur){
        tmp=cur.next
        cur.next=prev
        prev = cur
        cur=tmp
    }
    return prev
};

// 升级：反转链表并去重
var reverseList = function(head) {
    let prev=null,cur=head,tmp
    let arr =[]
    while(cur){
        //  去重
        if(arr.includes(cur.val)){
            tmp = cur.next
            delete cur.val
            cur.next = null
            cur=tmp
        }
        arr.push(cur.val)
        tmp=cur.next
        cur.next=prev
        prev = cur
        cur=tmp
    }
    return prev
};