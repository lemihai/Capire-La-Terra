# Importing the necessary
import os
import glob
from os.path import dirname, basename, isfile, join
import subprocess
import modules
import importlib
# import playwright
from playwright.sync_api import sync_playwright, Playwright

# Get the modules from the directory. Add thir names in the __all__ varaible
modules = glob.glob(join(dirname("./scraper/bots/NSB/modules/"), "*.py"))
# All of the files in the folder
__all__ = [basename(f)[:-3] for f in modules if isfile(f) and not f.endswith('__init__.py')]

scraper = "./scraper/bots/NSB/modules/aljazeera.py"

try:
    print("process starts")
    subprocess.run(f'powershell -Command python {scraper} ', shell=True, check=True)
    print("process ended")
except subprocess.CalledProcessError as e:
    print(e)







# # /////////////////////////////////// TEST that works
# # Get the modules from the directory. Add thir names in the __all__ varaible
# modules = glob.glob(join(dirname("./scraper/bots/NSB/modules/"), "*.py"))
# # All of the files in the folder
# __all__ = [basename(f)[:-3] for f in modules if isfile(f) and not f.endswith('__init__.py')]

# # Paths of this file and scripts
# t="./scraper/bots/NSB/modules/aljazeera.py"
# venv="./scraper/bots/NSB/Scripts/python.exe"
# file_path=__file__
# dir_path=os.path.dirname(file_path)

# try:
#     print("subprocess ran succesfully")

#     # Run venv
#     # subprocess.run([venv])
#     # Run each of the scripts
#     # subprocess.run(["pip", "install", "playwright"], shell=True, check=True)
#     # exec(open(venv).read(), {'__file__': venv})
#     subprocess.run(f'powershell -Command python {t} ', shell=True, check=True)

#     # subprocess.run(["pip", "install", "playwright"], shell=True, check=True)

#     for a in __all__:
#         # How to run (DON'T CHANGE)
#         # define the module as an importable in the script
#         module_import = f"modules.{a}"
#         # # print(module_import)
#         # # # storing the import of the module 
#         # module = importlib.import_module(module_import)
#         # module_path = join(dir_path, f"modules/{a}.py")
#         # try:
#         # subprocess.run([venv, 'python', module_path], shell=True, check=True)
#         # subprocess.run(f'powershell -Command ls ', shell=True, check=True)
#         # subprocess.run(['python', module_path])
#         print("success")
#         # except subprocess.CalledProcessError as e:
#         # print(f"Error running script '{a}': {e}")
# except subprocess.CalledProcessError as e:
#     print(e)

# print(__all__)
# print("hello")

# ///////////////////////////////////
# connect to database to retrieve the news articles


# dir_path=os.path.dirname(file_path)

# venv_path = os.path.join(dir_path, ".\Scripts", "activate.bat")
# print(venv_path)

# with open(venv_path) as f:
#     exec(f.read(), {'__file__':'activate.bat'})

# print(f"Python executable in use {sys.executable}")
# function that activated the env
# def activate_env(path):
#     subprocess.run([f"{path}\\Scripts\\activate.bat"], shell=True)
#     # subprocess.run(["source", path + "/Scripts/activate"], shell=True)

# # Activating the env
# activate_env("./NSB")

# Importing the necessary
# import os
# import glob
# from os.path import dirname, basename, isfile, join
# import subprocess
# import modules
# import importlib


# # Get the modules from the directory. Add thir names in the __all__ varaible
# modules = glob.glob(join(dirname("./scraper/bots/NSB/modules/"), "*.py"))
# __all__ = [basename(f)[:-3] for f in modules if isfile(f) and not f.endswith('__init__.py')]

# # Paths of this file and scripts
# venv="D:/Capire la Terra/server/src/scraper/bots/NSB/Scripts/activate.bat"
# file_path=__file__
# dir_path=os.path.dirname(file_path)
# print(dir_path)

# try:
#     # path to scripts
#     # subprocess.run([venv, "&&", "python", "D:/Capire la Terra/server/src/scraper/bots/NSB/modules/cleantechnica.py"], shell=True)
#     print("subprocess ran succesfully")



#     # Run each of the scripts
#     for a in __all__:
#         # print(a)
#         # create the module callable
#         # final_import = "modules." + a + ".py"
#         final_import  = join(dirname(f"{dir_path}/modules/"), f"{a}.py")
#         print(final_import)
#         # module = importlib.import_module(final_import)
#         subprocess.run(f'cmd /c "{venv} && python {final_import}"', shell=True, check=True)
#         # subprocess.run([venv])
#         # subprocess.run([venv, "&&", "python", module], shell=True)
#         # subprocess.run([venv, "&&", "cmd", "/C", "activate", "&&", "python", a], shell=True)

#         # Run module
#         # module()
# except subprocess.CalledProcessError as e:
#     print(e)


        # print(result)
        # final_import  = join(dirname(f"{dir_path}"),"NSB", "modules", f"{a}.py")
        # # import 
        # print(f"{a}.py")
        # test = f"{a}.py"
        
        # module = importlib.import_module(final_import)
        # result = subprocess.run([venv, final_import])
        
        # subprocess.run([final_import])
        # result2 = subprocess.run(f'cmd /c {venv}')
        # print(result)
        # subprocess.run([venv, "&&", "python", module], shell=True)
        # subprocess.run(f'cmd /c "{venv}"', shell=True, check=True)

        # Run module
        # module()