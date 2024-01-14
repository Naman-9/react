import { useCallback, useEffect, useRef, useState } from 'react';

const generatePassword = (length, isNumber, isSpecialCharacter) => {
  let result = '';

  let stg = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  if (isNumber) stg += '123456789';
  if (isSpecialCharacter) stg += '!@#$%^&*()_-+=';

  for (let index = 0; index < length; index++) {
    const randomIndex = Math.floor(Math.random() * stg.length);
    result += stg.charAt(randomIndex);
  }

  return result;
};

function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(9);
  const [isNumbersAllowed, setIsNumbersAllowed] = useState(true);
  const [isCharactersAllowed, setIsCharactersAllowed] = useState(true);
  const [buttonMessage, setButtonMessage] = useState('Copy');

  const passwordRef = useRef('');

  const updatePassword = useCallback(() => {
    const newPassword = generatePassword(length, isNumbersAllowed, isCharactersAllowed);

    setPassword(newPassword);
    passwordRef.current = newPassword;
  }, [length, isNumbersAllowed, isCharactersAllowed, setPassword]);

  // Function to copy the password to the clipboard
  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(passwordRef.current);
    setButtonMessage('Copied! 😃');
  }, [passwordRef]);

  useEffect(() => {
    updatePassword();
  }, [updatePassword]);

  return (
    <div className="bg-pink-100 h-screen w-screen flex justify-center items-start  p-10">
      <div className="h-auto w-1/2 bg-slate-300 rounded-lg mx-auto mt-32 shadow-xl p-8">
        <div className="w-full p-2 flex items-center justify-center">
          <input
            type="text"
            className="w-10/12 h-8 rounded-l-lg outline-none p-5 font-xl overflow-auto"
            value={password}
            ref={passwordRef}
            readOnly
          />
          <button
            className="w-35 bg-orange-400 rounded-r-lg p-2 font-semibold"
            onClick={copyToClipboard}
          >
            {buttonMessage}
          </button>
        </div>

        <div className="w-full px-4 pt-4 mt-4 flex items-center justify-evenly">
          <label htmlFor="length" className="flex items-center justify-center gap-1">
            <input
              id="length"
              type="range"
              min={6}
              max={20}
              value={length}
              className=""
              onChange={(e) => setLength(e.target.value)}
            />
            Length ({length})
          </label>
          <label htmlFor="length" className="flex items-center justify-center gap-1">
            <input
              type="checkbox"
              name="Number"
              id="number"
              checked={isNumbersAllowed}
              onChange={() => setIsNumbersAllowed((prev) => !prev)}
            />
            Number
          </label>
          <label htmlFor="length" className="flex items-center justify-center gap-1">
            <input
              type="checkbox"
              name="Number"
              id="number"
              checked={isCharactersAllowed}
              onChange={() => setIsCharactersAllowed((prev) => !prev)}
            />
            Special Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
