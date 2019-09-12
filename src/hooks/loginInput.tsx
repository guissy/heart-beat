import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';

export const LoginContext = createContext({} as any);

export function useToken(): { token: string, setToken: any } {
  const [token, setToken] = useState('');
  return { token, setToken };
}

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


const LoginInput: React.FC = () => {
  return (
    <div style={{ marginTop: '30px' }} className="ui container">
      <LoginContext.Provider value={useToken()}>
        <Nav/>
        <Input label={'时间：'} initialValue={Date.now()}/>
      </LoginContext.Provider>
    </div>
  );
}

export default LoginInput;
