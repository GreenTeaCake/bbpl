import type { ComponentType, FC } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { store } from 'store';
import { THEME } from 'theme';
import { getDisplayName } from 'pages/getDisplayName';

export function withTestEnv<P extends object>(Component: ComponentType<P>): ComponentType<P> {
  const TestEnvWrapper: FC<P> = (props) => {
    return (
      <ThemeProvider theme={THEME}>
        <Provider store={store}>
          <Component {...props} />
        </Provider>
      </ThemeProvider>
    );
  };

  TestEnvWrapper.displayName = `withTestEnv(${getDisplayName(Component)})`;

  return TestEnvWrapper;
}
