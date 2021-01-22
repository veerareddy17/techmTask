 const addMembers = members => (
    {
      type: 'ADD_Members',
      payload: members,
    }
  );

   const removeMember = updatedMembers => (
    {
      type: 'REMOVE_Member',
      payload: updatedMembers,
    }
   );

  export {addMembers, removeMember}