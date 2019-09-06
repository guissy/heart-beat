import React, { useCallback, useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './App.css';
import { LoginContext, useToken } from './token';
import Test from './Test';


function useToggle(initial = false): [boolean, (e: React.MouseEvent<HTMLElement>) => void] {
  const [toggle, setToggle] = useState(initial);
  const changeToggle = useCallback((e: any): void => setToggle(!toggle), [toggle]);
  return [toggle, changeToggle]
}

function Input({ label, initialValue }: any) {
  const [canEdit, setCanEdit] = useToggle(true);
  const [value, setValue] = useState(initialValue);
  const { token } = useContext(LoginContext);
  // value 要取 initialValue 的值
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue]);
  const timeValue = dayjs(value).format('YYYY-MM-DD hh:mm:ss');
  return (
    <section onClick={e => e.preventDefault()} style={{ margin: '5px 0' }}>
      {canEdit && token ?
        (
          <div className="ui label">
            <label>
              {label}
              <div className="ui input" style={{ width: '250px' }}>
                <input type="text" placeholder="请输入关键字" value={timeValue} onChange={(e) => setValue(e.target.value)}/>
              </div>
              <span>{' '}</span>
            </label>
          </div>
        )
        : (
          <div className="ui label">
            <span>{label}</span>
            <span>{timeValue}</span>
            <span>{' '}</span>
          </div>
        )}
      <button className="ui basic button" disabled={!token} onClick={setCanEdit}>{canEdit ? '完成' : '编辑'}</button>
    </section>
  );
}

function Nav() {
  const { token, setToken } = useContext(LoginContext);
  return (
    <nav>
      {!token
        ? <button className="ui basic blue button" onClick={() => setToken('good')}>登录</button>
        : <button className="ui basic red button" onClick={() => setToken('')}>退出</button>}
    </nav>
  )
}

const Home: React.FC = () => {
  const [start, setStart] = useState(Date.now());
  const [end, setEnd] = useState(Date.now());
  return (
    <LoginContext.Provider value={useToken()}>
      <Nav/>
      <form>
        <Input label={'开始时间：'} initialValue={start}/>
        <Input label={'结束时间：'} initialValue={end}/>
      </form>
      <div>
        <p> Pros -> State </p>
        <button className="ui basic button" onClick={() => {
          setStart((val) => {
            setEnd(Date.now())
            console.log('☞☞☞ 9527 App 73', Date.now(), end, dayjs(end).format('YYYY-MM-DD hh:mm:ss'));
            return Date.now()
          });
        }}>
          刷新开始
        </button>
        <button className="ui basic button" onClick={() => setEnd(Date.now())}>
          刷新结束
        </button>
      </div>
    </LoginContext.Provider>
  );
}


const StateCounterV2 = () => {
  let [count, setCount] = useState(0);
  let [frozen, setFrozen] = useState(false);

  useEffect(() => {
    setCount(prevCount => {
      // console.log('☞☞☞ 9527 App 95',' frozen = ', frozen);
      if (frozen) {
        return 10;
      }
      // console.log('☞☞☞ 9527 App 99', '🌹🌹🌹');
      return prevCount + 1;
    });
    setFrozen(pre => {
      console.log('☞☞☞ 9527 App 115', pre, count);
      return true;
    });
  }, [frozen]);
  console.log('☞☞☞ 9527 App count = ', count);
  return <div>{count}</div>;
};

const StateCounterV1 = () => {
  let [count, setCount] = useState(0);
  let [frozen, setFrozen] = useState(false);

  useEffect(() => {
    console.log('☞☞☞ 9527 App 116', '🌹🌹🌹', count);
    if (frozen) {
      setCount(count);
    } else {
      setCount(count + 1);
    }
    setFrozen(true)
  }, [frozen]);

  return <div>{count}</div>;
};

const App: React.FC = () => {
  const [show, setShow] = useState(true);
  return (
    <div style={{ marginTop: '30px' }} className="ui container">
      <button className="ui basic button" onClick={() => setShow(!show)} style={{ marginBottom: '10px' }}>
        重置
      </button>
      <StateCounterV1/>
      <Test/>
      {show && <Home/>}
    </div>
  );
}

interface Props {
}

const App2: React.FC<Props> = ({}) => {
  return (
    <div style={{ margin: 50, position: 'relative' }}>
      <style>{`
          @keyframes xxx {
            0% { width: 0; }
            30% { width: 190px; }
            75% { width: 190px; transform: translateX(0);}
            87% { width: 40px; transform: translateX(150px); opacity: 1; }
            100% { width: 40px; transform: translateX(150px); opacity: 0; }
          }
          @keyframes toRight {
            0% { transform: translateX(0); }
            33% { transform: translateX(150px); opacity: 1 }
            100% { transform: translateX(150px); opacity: 0 }
          }
          @keyframes rotate {
            0% { transform: rotate(0deg) }
            100% { transform: rotate(1turn) }
          }
        `}</style>
      <div style={{
        position: 'absolute',
        left: 0, top: 0,
        width: 190,
        height: 40,
        paddingLeft: 40,
        textIndent: 10,
        lineHeight: '40px',
        borderRadius: '20px',
        background: '#271d7e',
        color: '#fff',
        overflow: 'hidden',
        animation: 'xxx 8s 1s forwards',
        transformOrigin: '20px 20px',
      }}>
        <p style={{ lineHeight: '40px' }}>流动性比利润更重要</p>
      </div>
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        borderRadius: '50%',
        overflow: 'hidden',
        animation: 'toRight 3s 6s',
      }}>
        <div style={{
          borderRadius: '50%',
          overflow: 'hidden',
          animation: 'rotate 1s 6s',
        }}>
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gNzAK/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8AAEQgAKAAoAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8AqvqvhaZ7RZLIubdj5ARgdhLbj0b1Oa6HW7+wtZ4m1BCzPGNvIxt54IJ56mvPbLRp0ngkWxufuISzREbW2fdxjPB4zVzx7Y3t74mmeOUMkKxxxIWI52A7V4wTnPGc1330vYxO08O3Omy3TDTRL5iqSdxyMEjPf2rmo38G2jXNot1co1zcJLIDnJdGJGOPVjV/4dWk1tJJ50bKxQ7g0ZUqeO565ri73T2bU5LlYrhwLkhd6HJGV5zj1JoeruCOt+JEkc/gexSCQmI3KlS3Uja9FZPjwuvhvTo2z8sg4P8AutRWNZJTLjsZGueL/EkpbTLy+UYb5/s6hDkZ4JH8quWMmnxeBGuTeSR6klwYooVONxyG8w9+ATz6gVY12w0kaK72BtpLhjhmBLSsNwJJ/HvXPXunr9qmFqsrxqwEe5OWB+marllF6Cumel/DrxJe6/NcWWoSrK8EYZXCgFhnBzj8Pzrj1+IfiCfVFtgbYq02z/Vds49a3dG0uTw9qlnqGiQPeKzSJKOVGzy0JGfXcG5xjmrcfhX7NO84jMjHcwQxlSPmO05zjPTj2qlFt6uwmzL8d2Vze6Zp8cMZmuJZuFQdTtbpRWhrkM2natp891IVtLK8jaTaGfABO4jGT0bpRSqK7uEdj0w2Bb7yRH6xr/hS/YP+mcX/AH7H+FFFYczLsL9klU5Gwf8AARTJLefH3l/75FFFPmYWOa8UW+vCKBtOha4G8iVU2qcY4OSD39AaKKK3jJ2IaP/Z"
            alt="" style={{ width: 40, height: 40 }}/>
        </div>
      </div>
    </div>
  );
};

export default App2;

// export default App;
