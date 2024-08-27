function makeFriendsList(friends) {
  let friendList = document.createElement('ul');

  friends.forEach(friend => {
    let element = document.createElement('li');
    element.innerHTML = `${friend.firstName} ${friend.lastName}`;
    friendList.append(element);
  });

  return friendList;
}
