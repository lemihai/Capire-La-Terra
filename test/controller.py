# Importing the necessary
import os
import glob
from os.path import dirname, basename, isfile, join
import importlib
import subprocess

# This works

python_bin="./scraper/bots/NSB"
activate_this_file=".//scraper/bots/NSB/scripts/activate.bat"
subprocess.run([activate_this_file])
# exec(open(activate_this_file).read(), {'__file__': activate_this_file})

# *********** IMPORTING all files from the bots

# modules gets all the directories ending with python in the bots folder
modules = glob.glob(join(dirname("./scraper/bots/NSB"), "*.py"))
# the all variable is filtering the modules into the file names and putting them in the array
__all__ = [basename(f)[:-3] for f in modules if isfile(f) and not f.endswith('__init__.py') or f.endswith('controller.py')]

for a in __all__:
    # base_folder = "bots"
    final_import = "bots.NSB." + a
    module = importlib.import_module(final_import)
    module()


print(modules,"\n", __all__)
print("hello")
# connect to database to retrieve the news articles
