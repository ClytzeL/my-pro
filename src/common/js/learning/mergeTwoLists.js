/*
 * description 
 * @Author: liyan52 
 * @Date: 2020-06-12 11:11:53 
 * @Last Modified by: liyan52
 * @Last Modified time: 2020-06-30 19:15:57
 */
// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4 
var mergeTwoLists = function(l1, l2) {
    let p1 = l1
    let p2 = l2
    if(p1 != null && p2 !=null){
        let tmp1,tmp2
        if(p1.val <= p2.val){
            tmp1 = p1.next
            p1.next = p2
            tmp2 = p2.next
            p2.next = tmp1
            p1 = tmp1
            p2 = tmp2
        }else{
            tmp1 = p1.next
            tmp2 = p2.next
            p2.next = p1
            p2 = tmp2
            p1 = tmp1
        }
    }
    if(p1 == null){
        do{
            p1.val=p2.val
            p1.next = p2.next
            p1 = p1.next
            p2 = p2.next
        }while(p2)
    }
    
    return p1
};
// 升序，递归
var mergeTwoLists2 = function(l1, l2) {
    if(l1 == null)return l2;
    if(l2 == null)return l1;
    if(l1.val <l2.val){
        l1.next = mergeTwoLists2(l1.next,l2)
        return l1
    }else{
        l2.next = mergeTwoLists2(l1,l2.next)
        return l2
    }
}