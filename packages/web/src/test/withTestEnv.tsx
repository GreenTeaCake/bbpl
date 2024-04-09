import type { ComponentType, FC } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { store } from 'store';
import { THEME } from 'theme';
import { getDisplayName } from 'pages/getDisplayName';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

type WrapperProps = {
  initialEntries: string[];
};

export function withTestEnv<P extends object>(
  Component: ComponentType<P>,
): ComponentType<P & WrapperProps> {
  const TestEnvWrapper: FC<P & WrapperProps> = (props) => {
    const { initialEntries } = props;
    return (
      <ThemeProvider theme={THEME}>
        <Provider store={store}>
          <MemoryRouter initialEntries={initialEntries}>
            <Routes>
              <Route path="*" element={<Component {...props} />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </ThemeProvider>
    );
  };

  TestEnvWrapper.displayName = `withTestEnv(${getDisplayName(Component)})`;

  return TestEnvWrapper;
}
