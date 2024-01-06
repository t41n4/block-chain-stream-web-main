'use client';
import { configureChains } from '@wagmi/core';
import { sepolia, avalancheFuji, polygonMumbai } from '@wagmi/core/chains';
import { createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from '@wagmi/core/providers/public';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

const WagmiComponent = ({ children }: { children: React.ReactNode }) => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [sepolia, avalancheFuji, polygonMumbai],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: 'Blockchain Stream Web',
    projectId: 'df208f5c3bb3038d6dfb1bf97a755ca2',
    chains,
  });

  const config = createConfig({
    autoConnect: false,
    connectors,
    publicClient,
    webSocketPublicClient,
  });
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WagmiComponent;
