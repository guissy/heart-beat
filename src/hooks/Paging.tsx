import React, { useCallback } from 'react';

enum RefreshState {
  start = 0,
  finished = 1
}

const article = `爱上一个开源库，与其为她发布的新版本而放弃她，不如Fork下来，为她创建Pull Request。
以前我认为那行注释很重要，写出来就要一生一世，现在想一想，写不写也没有什么分别。
好多代码都没了，就象是遗失在风中的烟花，让我来不及说声再见就已经消逝不见。
应该有更好的方式开始学习新的语言，而不是千篇一律的在写Hello World。
上帝会把我们身边最好的代码拿走，以提醒我们代码里的Bug太多！
代码就像一盒巧克力，你永远不知道下次会出现什么新Bug。
性能这东西，时间很关键，优化得太早或太晚，都不行。
Bug就象照片，需要大量的暗房时间来调试。`.split('\n');

const Paging: React.FC = () => {
  const [fetchState, setFetchState] = React.useState(RefreshState.start);
  const [page, setPage] = React.useState(1);
  const [content, setContent] = React.useState('loading...');
  React.useEffect(() => {
      if (fetchState === RefreshState.finished) return;
      const url = 'http://jsonplaceholder.typicode.com/posts';
      setContent('loading...');
      fetch(url + '?' + page).then(() => {
        setContent('当前页面：' + page + '  ' + article[page]);
        setFetchState(RefreshState.finished);
      });
    },
    [fetchState, page]);
  const changePage = useCallback(page => {
    setFetchState(RefreshState.start);
    setPage(page);
  }, []);
  return <div>
    <p>{content}</p>
    <button className="ui button base" onClick={changePage.bind(null, 1)}>
      刷新第1页
    </button>
    {
      [1, 2, 3, 4, 5].map(v => <div key={v} style={{ display: 'inline' }}>
        <button className="ui button small" onClick={changePage.bind(null, v)}>
          {v}
        </button>
      </div>)
    }
  </div>;
};

export default Paging;