import { getComments, addComments } from './api';
import { appendCommentToDom, appendStyle } from './utils';
import { cssTemplate, getLoadMoreButton, getForm } from './templates';
import $ from 'jquery';

// 初始化
export function init(options) {
  let siteKey = '';
  let apiUrl = '';
  let commentDOM = null;
  let containerElement = null;
  let lastId = null;
  let isEnd = false;
  let loadMoreClassName;
  let commentsClassName;
  let commentsSelector;
  let formClassName;
  let formSelector;

  siteKey = options.siteKey
  apiUrl = options.apiUrl
  loadMoreClassName = `${siteKey}-load-more`
  commentsClassName = `${siteKey}-comments`
  formClassName = `${siteKey}-add-comment-from`
  commentsSelector = '.' + commentsClassName
  formSelector = '.' + formClassName

  containerElement = $(options.containerSelector);
  containerElement.append(getForm(formClassName, commentsClassName));
  appendStyle(cssTemplate);


  commentDOM = $(commentsSelector)
  getNewComments();

  $(commentsSelector).on('click', '.' + loadMoreClassName
  , () => {
    getNewComments();
  })

  $(formSelector).submit(e => {
    e.preventDefault();
    const nicknameDom = $(`${formSelector} input[name=nickname]`)
    const contentDom = $(`${formSelector} textarea[name=content]`)
    const newCommentData = {
      site_key: siteKey,
      nickname: nicknameDom.val(),
      content: contentDom.val()
    }
    addComments(apiUrl, siteKey, newCommentData, data => {
      if (!data.ok) {
        alert(data.message);
        return
      }
      nicknameDom.val('')
      contentDom.val('')
      appendCommentToDom(commentDOM, newCommentData, true)
    })
  })
  function getNewComments() {
    const commentDOM = $(commentsSelector)
    $('.' + loadMoreClassName).hide()
    if (isEnd) {
      return
    }
    getComments(apiUrl, siteKey, lastId, data => {
      if (!data.ok) {
        alert(data.message);
        return
      }
      const comments = data.discussions;
      
      for (let comment of comments) {
        appendCommentToDom(commentDOM, comment)
      }  
      
      let length = comments.length
      if (length === 0) {
        isEnd = true
        $('.' + loadMoreClassName).hide()
      }else {
        lastId = comments[length - 1].id
        const loadMoreButtonHTML = getLoadMoreButton(loadMoreClassName)
        $(commentsSelector).append(loadMoreButtonHTML)
      }
    }) 
  }
}