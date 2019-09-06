import React from 'react';

enum RefreshState {
  HeaderRefreshing = 0,
  Idle = 1
}

interface Props {
}

const Test: React.FC<Props> = (props) => {
  const [refreshState, setRefreshState] = React.useState(RefreshState.HeaderRefreshing);
  const [page, setPage] = React.useState(0);
  React.useEffect(() => {
      if (refreshState === RefreshState.Idle) return;
      const url = 'http://jsonplaceholder.typicode.com/posts';
      fetch(url + '?' + page).then(() => {
        setRefreshState(RefreshState.Idle)
      })
    },
    [refreshState, page]);
  return <div>
    <button className="ui button base" onClick={() => {
      setRefreshState(RefreshState.HeaderRefreshing);
      setPage(0);
    }}>
      刷新
    </button>
    {
      [1, 2, 3, 4, 5].map(v => <div key={v} style={{ display: 'inline' }}>
        <button className="ui button small" onClick={() => {
          setRefreshState(RefreshState.HeaderRefreshing);
          setPage(v);
        }}>
          {v}
        </button>
      </div>)
    }
  </div>;
};
// ReactDom.render(React.createElement(Test, {}), document.documentElement);

export default Test;