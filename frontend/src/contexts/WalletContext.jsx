import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { ContractAdd } from "../contracts/contract";
import { ABI } from "../contracts/contract";
import { ethers } from "ethers";