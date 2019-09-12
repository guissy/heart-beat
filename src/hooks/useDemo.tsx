import React, { useCallback, useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
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

const UseDemo: React.FC = () => {
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

export default UseDemo;
