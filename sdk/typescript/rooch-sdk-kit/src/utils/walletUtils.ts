// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0

import { SupportChain } from '../feature/index.js'
import {
  Wallet,
  UniSatWallet,
  OkxWallet,
  OnekeyWallet,
  // OnekeyHardwareWallet,
} from '../wellet/index.js'

export function capitalizeFirstLetter(string: string) {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export const formatAddress = (address?: string) => {
  if (!address) {
    return ''
  }
  let shortAddress = address.substring(0, 6)
  shortAddress += '...'
  shortAddress += address.substring(address.length - 6, address.length)

  return shortAddress
}
export async function checkWallets(filter?: SupportChain) {
  const wallets: Wallet[] = [
    new UniSatWallet(),
    new OkxWallet(),
    new OnekeyWallet(),
    // new OnekeyHardwareWallet(),
  ].filter((wallet) => wallet.getChain() === filter || !filter)

  return await Promise.all(wallets.filter(async (w) => await w.checkInstalled()))
}
