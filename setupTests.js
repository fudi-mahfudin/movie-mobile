// To extend expect in testing (i.e: toBeInTheScreen)
import '@testing-library/react-native/extend-expect';

// To make jest can read the env variables
import { load } from "@expo/env";
load(process.cwd());